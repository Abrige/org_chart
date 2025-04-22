package it.telematica.org_chart.repository;

import it.telematica.org_chart.model.Company;
import it.telematica.org_chart.model.Request;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RequestRepository extends CrudRepository<Request, Integer> {

    // ritorna tutte le richieste ordinate per data in modo decrescente
    List<Request> findByOrderByOperationDateDesc();

    // ritorna le richieste in base all'account id ordinate per data in modo decrescente
    List<Request> findByAccountIdOrderByOperationDateDesc(Integer accountId);

}
