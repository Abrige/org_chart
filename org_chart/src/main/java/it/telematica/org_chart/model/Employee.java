package it.telematica.org_chart.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "employees", schema = "org_chart")
public class Employee {
    @Id
    private Integer id;
    private String first_name;
    private String last_name;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date birthdate;
    private Character sex;
    @ManyToOne
    @JoinColumn(name = "city_fk", referencedColumnName = "id")
    private City city;
    @ManyToOne
    @JoinColumn(name = "company_fk", referencedColumnName = "id")
    private Company company;
    @Column(columnDefinition = "TINYINT(1)", name = "deleted")
    private boolean deleted;
    @ManyToMany
    @JoinTable(name = "employees_hierarchies",
            joinColumns = @JoinColumn(name = "superior_fk"),
            inverseJoinColumns = @JoinColumn(name = "subordinate_fk"))
    private Set<Employee> superiors = new HashSet<>();
    @ManyToMany(mappedBy = "superiors")
    private Set<Employee> subordinates = new HashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public Character getSex() {
        return sex;
    }

    public void setSex(Character sex) {
        this.sex = sex;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public Set<Employee> getSuperiors() {
        return superiors;
    }

    public void setSuperiors(Set<Employee> superiors) {
        this.superiors = superiors;
    }

    public Set<Employee> getSubordinates() {
        return subordinates;
    }

    public void setSubordinates(Set<Employee> subordinates) {
        this.subordinates = subordinates;
    }
}
