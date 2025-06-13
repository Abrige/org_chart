package it.telematica.org_chart.controller;

import it.telematica.org_chart.dto.CompanyDTO;
import it.telematica.org_chart.dto.EmployeeDTO;
import it.telematica.org_chart.dto.PaginationDTO;
import it.telematica.org_chart.model.*;
import it.telematica.org_chart.repository.*;
import it.telematica.org_chart.service.CompanyService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

//@CrossOrigin("*") // permette la chiamata da altra porta
@RequestMapping(value = "/home")
@RestController
public class HomeRestController {

    private final CompanyService companyService;
    private final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

    private CompanyRepository companyRepository;
    private EmployeeRepository employeeRepository;
    private CompanyHierarchiesRepository companyHierarchiesRepository;
    private CountriesRepository countriesRepository;
    private CitiesRepository citiesRepository;

    public HomeRestController(CompanyRepository companyRepository, EmployeeRepository employeeRepository, CompanyHierarchiesRepository companyHierarchiesRepository, CountriesRepository countriesRepository, CitiesRepository citiesRepository, CompanyService companyService) {

        this.companyRepository = companyRepository;
        this.employeeRepository = employeeRepository;
        this.companyHierarchiesRepository = companyHierarchiesRepository;
        this.countriesRepository = countriesRepository;
        this.citiesRepository = citiesRepository;
        this.companyService = companyService;
    }

    // ritorna tutte le aziende
    @GetMapping(value = "/companies")
    public List<Company> getCompanies() {
        return companyRepository.findByIsDeletedFalseOrderByNameAsc();
    }

    // ritorna tutte le aziende in base alla paginazione
    @PostMapping(value = "/companies")
    public Page<Company> getCompaniesPage(@RequestBody PaginationDTO pagination) {
        PageRequest pageRequest = PageRequest.of(pagination.page(), pagination.pageSize());
        return companyRepository.findByIsDeletedFalseOrderByNameAsc(pageRequest);
    }

    // ritorna tutti i dipendenti in base all'azienda selezionata
    @GetMapping(value = "/companies/{id}/employees")
    public List<Employee> getEmployeesByCompanyId(@PathVariable Integer id) {
        Company company = companyRepository.findById(id).orElse(null);

        if (company != null) {
            return employeeRepository.findByCompanyAndIsDeletedFalseOrderByFirstNameAsc(company);
        }
        return List.of();
    }

    // ritorna un dipendete in base al suo id
    @GetMapping(value = "/employee/{id}")
    public Employee getEmployeeById(@PathVariable Integer id) {
        return employeeRepository.findByIdAndIsDeletedFalse(id).orElse(null);
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

    // edit dei campi dell'employee
    @PostMapping(value = "/employee")
    public void editEmployeeData(@RequestBody EmployeeDTO employeeDTO) {
        Employee existingEmployee = employeeRepository.findById(employeeDTO.id()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));

        if (employeeDTO.first_name() != null) {
            existingEmployee.setFirstName(employeeDTO.first_name());
        }
        if (employeeDTO.last_name() != null) {
            existingEmployee.setLast_name(employeeDTO.last_name());
        }
        if (employeeDTO.birthdate() != null) {
            existingEmployee.setBirthdate(parseDate(employeeDTO.birthdate()));
        }
        if (employeeDTO.sex() != null) {
            existingEmployee.setSex(employeeDTO.sex());
        }
        if (employeeDTO.city_fk() != null) {
            existingEmployee.setCity(citiesRepository.findById(employeeDTO.city_fk()).orElse(null));
        }
        if (employeeDTO.company_fk() != null) {
            existingEmployee.setCompany(companyRepository.findById(employeeDTO.company_fk()).orElse(null));
        }
        employeeRepository.save(existingEmployee);
    }

    // edit dei campi dell'azienda
    @PostMapping(value = "/company")
    public void editCompanyData(@RequestBody CompanyDTO companyDTO) {
        Company existingCompany = companyRepository.findById(companyDTO.id()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found"));

        if (companyDTO.name() != null) {
            existingCompany.setName(companyDTO.name());
        }
        if (companyDTO.fiscalCode() != null) {
            existingCompany.setFiscalCode(companyDTO.fiscalCode());
        }
        if (companyDTO.city_fk() != null) {
            existingCompany.setCity(citiesRepository.findById(companyDTO.city_fk()).orElse(null));
        }
        if (companyDTO.logoUrl() != null) {
            existingCompany.setLogoUrl(companyDTO.logoUrl());
        }

        companyRepository.save(existingCompany);
    }

    // funzione di servizio per formattare in modo corretto la data
    private Date parseDate(String dateString) {
        try {
            return formatter.parse(dateString);
        } catch (java.text.ParseException e) {
            System.out.println("Error parsing birthdate: " + e.getMessage());
        }
        return null;
    }

    // add di un nuovo employee nel db
    @PutMapping("/employee")
    public ResponseEntity<String> createNewEmployee(@RequestBody EmployeeDTO employeeDTO) {
        Employee employee = new Employee();

        // campi obbligatori
        employee.setFirstName(employeeDTO.first_name());
        employee.setLast_name(employeeDTO.last_name());

        // campi opzionali
        employee.setBirthdate(employeeDTO.birthdate() != null && !employeeDTO.birthdate().isBlank() ? parseDate(employeeDTO.birthdate()) : null);
        employee.setSex(employeeDTO.sex() != null ? employeeDTO.sex() : null);

        // city
        if (employeeDTO.city_fk() != null) {
            employee.setCity(citiesRepository.findById(employeeDTO.city_fk()).orElse(null));
        }

        // company
        Company company = null;
        if (employeeDTO.company_fk() != null) {
            company = companyRepository.findById(employeeDTO.company_fk()).orElse(null);
            employee.setCompany(company);
        }

        // salva dipendente
        employeeRepository.save(employee);

        // aggiorna numOfEmployees solo se la company è presente
        if (company != null) {
            companyService.updateNumOfEmployees(company);
        }

        return ResponseEntity.ok("Nuovo dipendente inserito con id: " + employee.getId());
    }

    // add di una nuova azienda nel db
    @PutMapping("/company")
    public ResponseEntity<String> createOrUpdateCompany(@RequestBody CompanyDTO companyDTO) {

        Company company = new Company();
        // campi obbligatori (non nullable)
        company.setName(companyDTO.name());
        company.setFiscalCode(companyDTO.fiscalCode());
        company.setCity(citiesRepository.findById(companyDTO.city_fk()).orElse(null));
        // campi opzionali (nullable)
        company.setLogoUrl(companyDTO.logoUrl() != null ? companyDTO.logoUrl() : null);
        // imposta di default il numero di impiegati di un azienda a 0
        company.setNumOfEmployees(0);

        companyRepository.save(company);

        return ResponseEntity.ok("Company salvata con successo con id: " + company.getId());
    }

    // delete di un utente dal db
    @DeleteMapping("/employee/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Integer id) {
        // Verifica se l'employee esiste
        Optional<Employee> employeeOpt = employeeRepository.findById(id);

        if (employeeOpt.isEmpty()) {
            // 404 Not Found se non esiste
            return ResponseEntity.notFound().build();
        }

        // prende l'employee
        Employee employee = employeeOpt.get();

        // Prende la company prima di rimuovere il riferimento
        Company company = employee.getCompany();

        employee.setDeleted(true); // imposta il campo deleted dell'employee a true
        employee.setCompany(null); // leva il riferimento dell'azienda da quell'employee

        employeeRepository.save(employee); // salva le modifiche sul db

        // aggiorna il numero dei dipendenti, solo se company non è null
        if (company != null) {
            companyService.updateNumOfEmployees(company);
        }

        return ResponseEntity.ok().build();
    }

    // cancella una azienda
    @DeleteMapping("/company/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Integer id) {
        // Verifica se la company esiste
        Optional<Company> companyOpt = companyRepository.findById(id);

        if (companyOpt.isEmpty()) {
            // 404 Not Found se non esiste
            return ResponseEntity.notFound().build();
        }

        // recupera tutti gli employee per quella azienda
        List<Employee> employees = employeeRepository.findByCompanyOrderByIdAsc(companyOpt.get());

        // imposta il campo deleted dell'azienda a true
        companyOpt.get().setDeleted(true);
        companyRepository.save(companyOpt.get());

        // per ogni utente di quell'azienda imposta il campo deleted a true e a null l'azienda
        for (Employee employee : employees) {
            employee.setCompany(null);
            employeeRepository.save(employee);
        }

        return ResponseEntity.ok().build();
    }

}
