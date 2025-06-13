package it.telematica.org_chart.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import it.telematica.org_chart.model.Account;
import it.telematica.org_chart.model.AccountCompanies;
import it.telematica.org_chart.model.Company;
import it.telematica.org_chart.repository.AccountCompaniesRepository;
import it.telematica.org_chart.repository.AccountRepository;
import it.telematica.org_chart.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.*;

// Questa classe ha 3 compiti
// genera i token
// estrae gli username dai token (si collega alla classe CustomUserDetailsService)
// valida i token che gli arrivano
@Component // per far gestire la classe a spring, e farglielo istanziare quando gli serve
public class JwtUtils {

    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;
    private final AccountCompaniesRepository accountCompaniesRepository;
    // prende il valore della chiave jwt.secret dal file application.properties
    // in modo da non doverlo scrivere sul codice java perchè è segreta
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expirationMs}")
    private int jwtExpirationMs;

    public JwtUtils(AccountRepository accountRepository, RoleRepository roleRepository, AccountCompaniesRepository accountCompaniesRepository) {
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
        this.accountCompaniesRepository = accountCompaniesRepository;
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    ;

    // serve per generare il token in base all'username dell'utente
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();

        Optional<Account> account = accountRepository.findByMail(userDetails.getUsername());

        if (account.isPresent()) {
            Account ac = account.get();

            // Aziende dove l'utente è admin
            List<AccountCompanies> adminCompanies = accountCompaniesRepository.findAdminsByAccountId(ac.getId());
            // lista di id di Aziende in cui è admin
            List<Integer> adminCompanyIds = adminCompanies.stream()
                    .map(AccountCompanies::getCompanyId)
                    .toList();

            // lista di id di Aziende dove l'utente è dipendente
            List<Integer> employeeCompanyIds = ac.getCompanies().stream()
                    .map(Company::getId)
                    .toList();

            claims.put("role", ac.getRole());
            claims.put("adminForCompanies", adminCompanyIds);
            claims.put("employeeForCompanies", employeeCompanyIds);
        } else {
            claims.put("role", roleRepository.findByName("ROLE_USER"));
        }

        return Jwts.builder()
                .subject(userDetails.getUsername())
                .claims(claims)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    // dato un token estrae l'username dal payload
    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    // dato un token verifica se è valido
    public boolean validateToken(String token,
                                 UserDetails userDetails) {
        String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // verifica se il token è scaduto
    private boolean isTokenExpired(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration()
                .before(new Date());
    }
}
