package it.telematica.org_chart.controller;

import it.telematica.org_chart.config.JwtUtils;
import it.telematica.org_chart.dto.AuthRequestDTO;
import it.telematica.org_chart.dto.AuthResponseDTO;
import it.telematica.org_chart.model.Account;
import it.telematica.org_chart.repository.AccountRepository;
import it.telematica.org_chart.repository.RoleRepository;
import it.telematica.org_chart.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@RestController
public class AuthController {

    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;
    private UserService userService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtUtils jwtUtils,
                          UserService userService, AccountRepository accountRepository, RoleRepository roleRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userService = userService;
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
    }

    @PostMapping(value = "/login")
    public ResponseEntity<AuthResponseDTO> authenticate(@RequestBody AuthRequestDTO authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.mail(), authRequest.password())
        );
        Optional<Account> account = accountRepository.findByMail(authRequest.mail());
        String token = jwtUtils.generateToken((UserDetails) authentication.getPrincipal());

        return ResponseEntity.ok(new AuthResponseDTO(token));
    }

    @PostMapping(value = "/register")
    public ResponseEntity<Void> register(@RequestBody AuthRequestDTO authRequest) {
        // controlla se l'utente non era già stato registrato
        if (userService.isRegistered(authRequest.mail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        userService.register(authRequest.mail(), authRequest.password());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
