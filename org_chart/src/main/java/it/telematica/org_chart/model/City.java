package it.telematica.org_chart.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cities", schema = "org_chart")
public class City {
    @Id
    private Integer id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "country_fk", referencedColumnName = "id")
    private Country country;

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

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
}
