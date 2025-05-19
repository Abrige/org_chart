package it.telematica.org_chart.repository;

import it.telematica.org_chart.model.Company;
import it.telematica.org_chart.model.CompanyHierarchies;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CompanyHierarchiesRepository extends CrudRepository<CompanyHierarchies, Integer> {
    // ritorna tutte le company hierarchies ordinate per nome in modo crescente
    List<CompanyHierarchies> findByCompany(Company company);
}
