package it.telematica.org_chart.dto;

public record CompanyDTO(
        Integer id, // nullable: null = crea nuovo, valore = aggiorna esistente
        String name,
        String fiscalCode,
        Integer city_fk,
        String logoUrl // nullable
) {}
