package it.telematica.org_chart.repository;

import it.telematica.org_chart.model.Company;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CompanyRepository extends CrudRepository<Company, Integer> {
    // ritorna tutte le company ordinate per nome in modo crescente
    List<Company> findByOrderByNameAsc();
}
