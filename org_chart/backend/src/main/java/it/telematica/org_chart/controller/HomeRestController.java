package it.telematica.org_chart.controller;

import it.telematica.org_chart.model.*;
import it.telematica.org_chart.repository.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping(value = "/home")
@RestController
public class HomeRestController {

    private CompanyRepository companyRepository;
    private EmployeeRepository employeeRepository;
    private CompanyHierarchiesRepository companyHierarchiesRepository;
    private CountriesRepository countriesRepository;
    private CitiesRepository citiesRepository;

    public HomeRestController(CompanyRepository companyRepository,
                              EmployeeRepository employeeRepository,
                              CompanyHierarchiesRepository companyHierarchiesRepository,
                              CountriesRepository countriesRepository,
                              CitiesRepository citiesRepository) {

        this.companyRepository = companyRepository;
        this.employeeRepository = employeeRepository;
        this.companyHierarchiesRepository = companyHierarchiesRepository;
        this.countriesRepository = countriesRepository;
        this.citiesRepository = citiesRepository;
    }

    // ritorna tutte le aziende
    @GetMapping(value = "/companies")
    public List<Company> getCompanies() {
        return companyRepository.findByOrderByNameAsc();
    }

    // ritorna tutti i dipendenti in base all'azienda selezionata
    @GetMapping(value = "/companies/{id}/employees")
    public List<Employee> getEmployeesByCompanyId(@PathVariable Integer id) {
        Company company = companyRepository.findById(id).orElse(null);

        if (company != null) {
            return employeeRepository.findByCompanyOrderByIdAsc(company);
        }
        return List.of();
    }

    // ritorna un dipendete in base al suo id
    @GetMapping(value = "/employee/{id}")
    public Employee getEmployeeById(@PathVariable Integer id) {
        return employeeRepository.findById(id).orElse(null);
    }

    // ritorna le gerarchie dei dipendenti in base all'azienda selezionata
    @GetMapping(value = "/companies/{id}/employeeshierarchies")
    public List<CompanyHierarchies> getEmployeeshierarchies(@PathVariable Integer id) {
        Company company = companyRepository.findById(id).orElse(null);

        if (company != null) {
            return companyHierarchiesRepository.findByCompany(company);
        }
        return List.of();
    }

    // ritorna la lista dei paesi
    @GetMapping(value = "/countries")
    public List<Country> getCountries() {
        return countriesRepository.findByOrderByNameAsc();
    }

    // ritorna la lista delle città in base al paese selezionato
    @GetMapping(value = "/countries/{id}/cities")
    public List<City> getCitiesByCountry(@PathVariable Integer id) {

        Country country = countriesRepository.findById(id).orElse(null);

        if (country != null) {
            return citiesRepository.findByCountryOrderByNameAsc(country);
        }

        // se non c'è niente ritorna la lista vuota
        return List.of();
    }

}
