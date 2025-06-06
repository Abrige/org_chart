package it.telematica.org_chart.repository;

import it.telematica.org_chart.model.Company;
import it.telematica.org_chart.model.Employee;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends CrudRepository<Employee, Integer> {

    // ritorna tutti gli employee in base alla company
    List<Employee> findByCompanyOrderByIdAsc(Company company);

    List<Employee> findByCompanyAndIsDeletedFalseOrderByFirstNameAsc(Company company);

    Optional<Employee> findByIdAndIsDeletedFalse(int id);

}
