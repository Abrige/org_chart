package it.telematica.org_chart.service;

import it.telematica.org_chart.model.Company;
import it.telematica.org_chart.repository.CompanyRepository;
import it.telematica.org_chart.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final EmployeeRepository employeeRepository;

    public CompanyService(CompanyRepository companyRepository, EmployeeRepository employeeRepository) {
        this.companyRepository = companyRepository;
        this.employeeRepository = employeeRepository;
    }

    /**
     * Aggiorna il numero di dipendenti per una singola azienda.
     */
    @Transactional
    public void updateNumOfEmployees(Company company) {
        int count = employeeRepository.countByCompanyAndIsDeletedFalse(company);
        company.setNumOfEmployees(count);
        companyRepository.save(company);
    }

    /**
     * Aggiorna il numero di dipendenti per tutte le aziende.
     */
    @Transactional
    public void updateAllCompaniesNumOfEmployees() {
        List<Company> companies = companyRepository.findByOrderByNameAsc();
        for (Company company : companies) {
            updateNumOfEmployees(company);
        }
    }

}
