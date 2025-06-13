package it.telematica.org_chart.repository;

import it.telematica.org_chart.model.Company;
import it.telematica.org_chart.model.Employee;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends CrudRepository<Employee, Integer> {

    // ritorna TUTTI gli employee in base alla company ordinati in base all'id dell'employee
    List<Employee> findByCompanyOrderByIdAsc(Company company);
    // ritorna tutti gli employee in base alla company, che non sono cancellati ordinati per nome crescente
    List<Employee> findByCompanyAndIsDeletedFalseOrderByFirstNameAsc(Company company);
    // ritorna un employee in base all'id
    Optional<Employee> findByIdAndIsDeletedFalse(int id);
    // ritorna il numero di dipendenti in base all'azienda
    int countByCompanyAndIsDeletedFalse(Company company);
    // lista di dipendenti che non sono cancellati
    List<Employee> findByIsDeletedFalse();
}
