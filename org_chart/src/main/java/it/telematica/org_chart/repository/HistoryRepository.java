package it.telematica.org_chart.repository;

import it.telematica.org_chart.model.History;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface HistoryRepository extends CrudRepository<History, Integer> {

    // ritorna tutte le history ordinate per data in modo decrescente
    List<History> findByOrderByOperationDateDesc();
}
