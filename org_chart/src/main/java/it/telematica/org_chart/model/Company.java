package it.telematica.org_chart.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "companies", schema = "org_chart")
public class Company {
    @Id
    private Integer id;
    private String name;
    private String fiscalCode;
    @ManyToOne
    @JoinColumn(name = "city_fk", referencedColumnName = "id")
    private City city;
    private String logoUrl;
    private Integer numOfEmployees;
    @Column(columnDefinition = "TINYINT(1)", name = "is_deleted")
    private boolean isDeleted;
    // serve per mostrare i dati dal join della tabella many to many che abbiamo creato sul database però dall'altro lato
    @ManyToMany(mappedBy = "companies")
    private Set<Account> accounts = new HashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFiscalCode() {
        return fiscalCode;
    }

    public void setFiscalCode(String fiscalCode) {
        this.fiscalCode = fiscalCode;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public Integer getNumOfEmployees() {
        return numOfEmployees;
    }

    public void setNumOfEmployees(Integer numOfEmployees) {
        this.numOfEmployees = numOfEmployees;
    }

    public Set<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(Set<Account> accounts) {
        this.accounts = accounts;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}
