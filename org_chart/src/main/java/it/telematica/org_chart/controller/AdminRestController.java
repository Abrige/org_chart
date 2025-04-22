package it.telematica.org_chart.controller;

import it.telematica.org_chart.model.History;
import it.telematica.org_chart.model.Request;
import it.telematica.org_chart.model.Role;
import it.telematica.org_chart.repository.AccountRepository;
import it.telematica.org_chart.repository.HistoryRepository;
import it.telematica.org_chart.repository.RequestRepository;
import it.telematica.org_chart.service.CustomUserDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.List;

// Gestisce la logica per le richieste REST per l'amministratore
@RequestMapping(value = "/admin")
@RestController
public class AdminRestController {

    private HistoryRepository historyRepository;
    private RequestRepository requestRepository;
    private CustomUserDetailsService customUserDetailsService;

    public AdminRestController(HistoryRepository historyRepository,
                               RequestRepository requestRepository,
                               CustomUserDetailsService customUserDetailsService) {
        this.historyRepository = historyRepository;
        this.requestRepository = requestRepository;
        this.customUserDetailsService = customUserDetailsService;
    }

    // ritorna la lista di tutta la history
    @GetMapping(value = "/history")
    public ResponseEntity<Object> getHistory() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // verifica che non sia un utente anonimo, ma un utente loggato sul sito provvisto di token
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();
            Role userRole = this.customUserDetailsService.loadRoleByUsername(currentUserName);
            if(userRole.getName().equals("ROLE_SYSADMIN")) {
                return ResponseEntity.status(HttpStatus.OK).body(historyRepository.findByOrderByOperationDateDesc());
            }
        }
        return ResponseEntity.status(403).body("Access Denied");
    }

    // ritorna la lista di tutte le richieste
    @GetMapping(value = "/requests")
    public ResponseEntity<Object> getRequests() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // verifica che non sia un utente anonimo, ma un utente loggato sul sito provvisto di token
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();
            Role userRole = this.customUserDetailsService.loadRoleByUsername(currentUserName);
            if(userRole.getName().equals("ROLE_SYSADMIN")) {
                return ResponseEntity.status(HttpStatus.OK).body(requestRepository.findByOrderByOperationDateDesc());
            }
            if(userRole.getName().equals("ROLE_COMPANY_ADMIN")) {
                Integer accountId = this.customUserDetailsService.loadIdByUsername(currentUserName);
                return ResponseEntity.status(HttpStatus.OK).body(requestRepository.findByAccountIdOrderByOperationDateDesc(accountId));
            }
        }
        return ResponseEntity.status(403).body("Access Denied");
    }

}
