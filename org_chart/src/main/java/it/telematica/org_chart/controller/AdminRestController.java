package it.telematica.org_chart.controller;

import it.telematica.org_chart.model.History;
import it.telematica.org_chart.model.Request;
import it.telematica.org_chart.repository.HistoryRepository;
import it.telematica.org_chart.repository.RequestRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AdminRestController {

    private HistoryRepository historyRepository;
    private RequestRepository requestRepository;

    public AdminRestController(HistoryRepository historyRepository, RequestRepository requestRepository) {
        this.historyRepository = historyRepository;
        this.requestRepository = requestRepository;
    }

    // ritorna la lista di tutta la history
    @GetMapping(value = "/admin/history")
    public List<History> getHistory() {
        return historyRepository.findByOrderByOperationDateDesc();
    }

    // ritorna la lista di tutte le richieste
    @GetMapping(value = "/admin/requests")
    public List<Request> getRequests() {
        return requestRepository.findByOrderByOperationDateDesc();
    }
    
}
