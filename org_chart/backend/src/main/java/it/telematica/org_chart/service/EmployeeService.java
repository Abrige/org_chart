package it.telematica.org_chart.service;

import it.telematica.org_chart.model.Employee;
import it.telematica.org_chart.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeService {

    private final CompanyService companyService;
    private final EmployeeRepository employeeRepository;

    public EmployeeService(CompanyService companyService, EmployeeRepository employeeRepository) {
        this.companyService = companyService;
        this.employeeRepository = employeeRepository;
    }

    /**
     * Crea un nuovo dipendente e aggiorna il numero di dipendenti dell'azienda.
     */
    @Transactional
    public Employee createEmployee(Employee employee) {
        Employee saved = employeeRepository.save(employee);
        companyService.updateNumOfEmployees(saved.getCompany());
        return saved;
    }

    /**
     * Elimina (soft delete) un dipendente e aggiorna il numero di dipendenti dell'azienda.
     */
    @Transactional
    public void deleteEmployee(Integer id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dipendente non trovato con id: " + id));

        employee.setDeleted(true);
        employeeRepository.save(employee);
        companyService.updateNumOfEmployees(employee.getCompany());
    }
}
