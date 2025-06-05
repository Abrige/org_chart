package it.telematica.org_chart.controller;
import it.telematica.org_chart.dto.EmployeeDTO;
import it.telematica.org_chart.dto.Pagination;
import it.telematica.org_chart.model.*;
import it.telematica.org_chart.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

//@CrossOrigin("*") // permette la chiamata da altra porta
@RequestMapping(value = "/home")
@RestController
public class HomeRestController {

    private SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

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

    // ritorna tutte le aziende in base alla paginazione
    @PostMapping(value = "/companies")
    public Page<Company> getCompaniesPage(@RequestBody Pagination pagination) {
        PageRequest pageRequest = PageRequest.of(pagination.getPage(), pagination.getPageSize());
        return companyRepository.findAll(pageRequest);
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

    @PostMapping(value = "/employee")
    public void editEmployeeData(@RequestBody EmployeeDTO employee){
        Employee e = new Employee();

        e.setId(employee.id());
        e.setFirst_name(employee.first_name());
        e.setLast_name(employee.last_name());
        e.setBirthdate(parseDate(employee.date()));
        e.setSex(employee.sex());
        e.setCity(citiesRepository.findById(employee.city_fk()).orElse(null));
        e.setCompany(companyRepository.findById(employee.company_fk()).orElse(null));

        employeeRepository.save(e);
    }

    private Date parseDate(String dateString){
        try {
            return formatter.parse(dateString);
        } catch (java.text.ParseException e) {
            System.out.println("Error parsing date: " + e.getMessage());
        }
        return null;
    }
}
