package it.telematica.org_chart.repository;

import it.telematica.org_chart.model.Country;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

// Country è la classe del modello su cui vogliamo mappare il DAO, mentre Integer è il tipo della chiave primaria

public interface CountriesRepository extends CrudRepository<Country, Integer> {
    List<Country> findByOrderByNameAsc();
}

