package it.telematica.org_chart.controller;

import it.telematica.org_chart.config.JwtUtils;
import it.telematica.org_chart.dto.AuthRequest;
import it.telematica.org_chart.dto.AuthResponse;
import it.telematica.org_chart.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getMail(), authRequest.getPassword())
        );

        // genera il token JWT
        String token = jwtUtils.generateToken((UserDetails) authentication.getPrincipal());

        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping(value = "/register")
    public ResponseEntity<Void> register(@RequestBody AuthRequest authRequest) {
        // controlla se l'utente non era già stato registrato
        if (userService.isRegistered(authRequest.getMail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        userService.register(authRequest.getMail(), authRequest.getPassword());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
