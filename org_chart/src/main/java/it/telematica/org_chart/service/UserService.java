package it.telematica.org_chart.service;

import it.telematica.org_chart.model.Account;
import it.telematica.org_chart.model.Role;
import it.telematica.org_chart.repository.AccountRepository;
import it.telematica.org_chart.repository.RoleRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// gestisce la registrazione dell'utente
@Service
public class UserService {

    private AccountRepository accountRepository;
    private PasswordEncoder passwordEncoder;
    private RoleRepository roleRepository;

    public UserService(AccountRepository accountRepository,
                       PasswordEncoder passwordEncoder,
                       RoleRepository roleRepository) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    // crea un account con lo username l'email e la password criptata, lo diamo all'account repo che la gestisce lui
    // sul db
    public void register(String email,
                         String password) {
        Account account = new Account();
        account.setMail(email);
        account.setPassword(passwordEncoder.encode(password));
        account.setRole(roleRepository.findByName("ROLE_USER"));
        accountRepository.save(account);
    }

    public boolean isRegistered(String email) {
        return accountRepository.findByMail(email).isPresent();
    }
}
