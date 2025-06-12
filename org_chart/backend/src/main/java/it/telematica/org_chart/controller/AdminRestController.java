package it.telematica.org_chart.controller;

import it.telematica.org_chart.dto.RequestDTO;
import it.telematica.org_chart.enums.ApprovalStatus;
import it.telematica.org_chart.model.Request;
import it.telematica.org_chart.model.RequestView;
import it.telematica.org_chart.model.Role;
import it.telematica.org_chart.repository.HistoryRepository;
import it.telematica.org_chart.repository.RequestRepository;
import it.telematica.org_chart.repository.RequestViewRepository;
import it.telematica.org_chart.service.CustomUserDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

// Gestisce la logica per le richieste REST per l'amministratore
@RequestMapping(value = "/admin")
@RestController
public class AdminRestController {

    private final RequestRepository requestRepository;
    private HistoryRepository historyRepository;
    private RequestViewRepository requestViewRepository;
    private CustomUserDetailsService customUserDetailsService;

    public AdminRestController(HistoryRepository historyRepository, RequestViewRepository requestViewRepository, CustomUserDetailsService customUserDetailsService, RequestRepository requestRepository) {
        this.historyRepository = historyRepository;
        this.requestViewRepository = requestViewRepository;
        this.customUserDetailsService = customUserDetailsService;
        this.requestRepository = requestRepository;
    }

    // ritorna la lista di tutta la history
    @GetMapping(value = "/history")
    public ResponseEntity<Object> getHistory() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // verifica che non sia un utente anonimo, ma un utente loggato sul sito provvisto di token
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();
            Role userRole = this.customUserDetailsService.loadRoleByUsername(currentUserName);
            if (userRole.getName().equals("ROLE_SYSADMIN")) {
                return ResponseEntity.status(HttpStatus.OK).body(historyRepository.findByOrderByOperationDateDesc());
            }
        }
        return ResponseEntity.status(403).body("Access Denied");
    }

    // ritorna la lista di tutte le richieste
    @GetMapping(value = "/requests")
    public ResponseEntity<Object> getRequests() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // verifica che non sia un utente anonimo, ma un utente loggato sul sito, quindi provvisto di token
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();
            Role userRole = this.customUserDetailsService.loadRoleByUsername(currentUserName);
            Integer userId = this.customUserDetailsService.loadIdByUsername(currentUserName);
            // se l'utente è loggato ma non hai il ruolo giusto allora non può accedere
            if (userRole.getName().equals("ROLE_USER")) {
                return ResponseEntity.status(403).body("Access Denied");
            }
            return ResponseEntity.status(HttpStatus.OK).body(requestViewRepository.findRequestsByAccountAndRole(userRole.getId(), userId)); // con questa
            // query in base al tuo ruolo e id dell'account, ti ritorna le richieste in base al tuo ruolo
        }
        return ResponseEntity.status(403).body("Access Denied");
    }

    // gestisce l'approvazione o l'eliminazione della request
    @PostMapping(value = "/request")
    public ResponseEntity<Object> editRequest(@RequestBody RequestDTO requestDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied");
        }

        String currentUserName = authentication.getName();
        Role userRole = this.customUserDetailsService.loadRoleByUsername(currentUserName);

        if (!"ROLE_SYSADMIN".equals(userRole.getName())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access Denied");
        }

        Optional<Request> optionalRequest = requestRepository.findById(requestDTO.id());

        if (optionalRequest.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found");
        }

        Request request = optionalRequest.get();

        String action = requestDTO.action();

        if ("approve".equals(action)) {
            request.setIsApproved(ApprovalStatus.APPROVED);
        } else if ("reject".equals(action)) {
            request.setIsApproved(ApprovalStatus.NOT_APPROVED);
        } else {
            return ResponseEntity.badRequest().body("Invalid action");
        }

        requestRepository.save(request);

        return ResponseEntity.ok().build();
    }


}
