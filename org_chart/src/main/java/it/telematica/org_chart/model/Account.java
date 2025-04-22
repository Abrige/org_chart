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
    @GeneratedValue(strategy = GenerationType.IDENTITY) // indica l'auto increment, dal lato di spring security,
    // poichè implementiamo l'interfaccia UserDetails
    private Integer id;
    private String mail;
    private String password;
    @ManyToOne
    @JoinColumn(name = "role_fk", referencedColumnName = "id")
    private Role role;
    @Column(columnDefinition = "TINYINT(1)", name = "is_deleted")
    private boolean isDeleted;
    // serve per mostrare i dati dal join della tabella many to many che abbiamo creato sul database
    @ManyToMany
    @JoinTable(name = "accounts_companies",
            joinColumns = @JoinColumn(name = "account_fk"),
            inverseJoinColumns = @JoinColumn(name = "company_fk"))
    private Set<Company> companies = new HashSet<>();
    // serve per mostrare i dati dal join della tabella many to many che abbiamo creato sul database però dall'altro lato
    @ManyToMany(mappedBy = "accounts")
    private Set<Request> request = new HashSet<>();

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

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public Set<Company> getCompanies() {
        return companies;
    }

    public void setCompanies(Set<Company> companies) {
        this.companies = companies;
    }

    public Set<Request> getRequest() {
        return request;
    }

    public void setRequest(Set<Request> request) {
        this.request = request;
    }

    @Override
    public String getUsername() {
        return mail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.getName()));
    }

    @Override
    public String getPassword() {
        return password;
    }
}
