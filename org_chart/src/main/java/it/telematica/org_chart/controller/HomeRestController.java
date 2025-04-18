package it.telematica.org_chart.controller;

import it.telematica.org_chart.model.Company;
import it.telematica.org_chart.model.CompanyHierarchies;
import it.telematica.org_chart.model.Employee;
import it.telematica.org_chart.repository.CompanyHierarchiesRepository;
import it.telematica.org_chart.repository.CompanyRepository;
import it.telematica.org_chart.repository.EmployeeRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HomeRestController {

    private CompanyRepository companyRepository;
    private EmployeeRepository employeeRepository;
    private CompanyHierarchiesRepository companyHierarchiesRepository;

    // ritorna tutte le aziende
    @GetMapping(value = "/home/companies")
    public List<Company> getCompanies() {
        return companyRepository.findByOrderByNameAsc();
    }

    // ritorna tutti i dipendenti in base all'azienda selezionata
    @GetMapping(value = "/home/companies/{id}/employees")
    public List<Employee> getEmployees(@PathVariable Integer id) {
        Company company = companyRepository.findById(id).orElse(null);

        if(company != null) {
            return employeeRepository.findByCompanyOrderByIdAsc(company);
        }
        return List.of();
    }

    // ritorna un dipendete in base al suo id
    @GetMapping(value = "/home/employee/{id}")
    public Employee getEmployee(@PathVariable Integer id) {
        return employeeRepository.findById(id).orElse(null);
    }

    // ritorna le gerarchie dei dipendenti in base all'azienda selezionata
    @GetMapping(value = "/home/companies/{id}/employeeshierarchies")
    public List<CompanyHierarchies> getEmployeeshierarchies(@PathVariable Integer id) {
        Company company = companyRepository.findById(id).orElse(null);

        if(company != null) {
            return companyHierarchiesRepository.findByCompany(company);
        }
        return List.of();
    }
}
