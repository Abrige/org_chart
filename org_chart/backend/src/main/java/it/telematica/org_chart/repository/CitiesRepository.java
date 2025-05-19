package it.telematica.org_chart.repository;

import it.telematica.org_chart.model.City;
import it.telematica.org_chart.model.Country;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CitiesRepository extends CrudRepository<City, Integer> {
    List<City> findByCountryOrderByNameAsc(Country country);
}
