package it.telematica.org_chart.model;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "accounts", schema = "org_chart")
public class Account implements UserDetails {
    @Id
    private Integer id;
    private String mail;
    private String password;
    @ManyToOne
    @JoinColumn(name = "employee_fk", referencedColumnName = "id")
    private Employee employee;
    // TODO rivedere questo enum
    @Enumerated(EnumType.ORDINAL)
    private UserRole userRole;
    @Column(columnDefinition = "TINYINT(1)", name = "deleted")
    private boolean deleted;
    // serve per mostrare i dati dal join della tabella many to many che abbiamo creato sul database
    @ManyToMany()
    @JoinTable(name = "accounts_companies",
            joinColumns = @JoinColumn(name = "account_fk"),
            inverseJoinColumns = @JoinColumn(name = "company_fk"))
    private Set<Company> companies = new HashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return this.mail; // Assuming mail is used as username
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public Set<Company> getCompanies() {
        return companies;
    }

    public void setCompanies(Set<Company> companies) {
        this.companies = companies;
    }
}
