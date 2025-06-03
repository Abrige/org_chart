package it.telematica.org_chart.repository;

import it.telematica.org_chart.model.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CompanyRepository extends CrudRepository<Company, Integer> {
    // ritorna tutte le company ordinate per nome in modo crescente
    List<Company> findByOrderByNameAsc();

    // ritorna un tot di aziende in base alla paginazione
    List<Company> findByOrderByNameDesc();

    // ritorna una azienda in base al nome
    Company findByNameOrderById(String name);

    Page<Company> findAll(Pageable pageable);
}
