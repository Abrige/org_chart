package it.telematica.org_chart.model;

import jakarta.persistence.*;
import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Table(name = "v_companies_hierarchies", schema = "org_chart")
public class CompanyHierarchies {
    @Id
    private Integer id;
    private Integer superiorId;
    private String superiorFirstName;
    private String superiorLastName;
    private Integer subordinateId;
    private String subordinateFirstName;
    private String subordinateLastName;
    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private Company company;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSuperiorId() {
        return superiorId;
    }

    public void setSuperiorId(Integer superiorId) {
        this.superiorId = superiorId;
    }

    public String getSuperiorFirstName() {
        return superiorFirstName;
    }

    public void setSuperiorFirstName(String superiorFirstName) {
        this.superiorFirstName = superiorFirstName;
    }

    public String getSuperiorLastName() {
        return superiorLastName;
    }

    public void setSuperiorLastName(String superiorLastName) {
        this.superiorLastName = superiorLastName;
    }

    public Integer getSubordinateId() {
        return subordinateId;
    }

    public void setSubordinateId(Integer subordinateId) {
        this.subordinateId = subordinateId;
    }

    public String getSubordinateFirstName() {
        return subordinateFirstName;
    }

    public void setSubordinateFirstName(String subordinateFirstName) {
        this.subordinateFirstName = subordinateFirstName;
    }

    public String getSubordinateLastName() {
        return subordinateLastName;
    }

    public void setSubordinateLastName(String subordinateLastName) {
        this.subordinateLastName = subordinateLastName;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}
