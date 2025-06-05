package it.telematica.org_chart.dto;

public record EmployeeDTO(
        Integer id, // nullable: null se nuovo, valore se update
        String first_name,
        String last_name,
        String birthdate, // format yyyy-MM-dd
        Character sex,
        Integer city_fk,
        Integer company_fk
) {}
