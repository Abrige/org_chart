package it.telematica.org_chart.controller;

import it.telematica.org_chart.config.JwtUtils;
import it.telematica.org_chart.dto.AuthRequestDTO;
import it.telematica.org_chart.dto.AuthResponseDTO;
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


@RestController
public class AuthController {

    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;
    private UserService userService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtUtils jwtUtils,
                          UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userService = userService;
    }

    @PostMapping(value = "/login")
    public ResponseEntity<AuthResponseDTO> authenticate(@RequestBody AuthRequestDTO authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.mail(), authRequest.password())
        );

        // genera il token JWT
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
