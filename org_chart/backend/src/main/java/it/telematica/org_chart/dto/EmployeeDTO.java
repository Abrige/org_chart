package it.telematica.org_chart.dto;

public record EmployeeDTO(
        int id,
        String first_name,
        String last_name,
        String date,
        Character sex,
        int city_fk,
        int company_fk
) {}
