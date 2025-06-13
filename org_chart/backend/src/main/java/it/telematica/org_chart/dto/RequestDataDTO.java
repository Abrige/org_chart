package it.telematica.org_chart.dto;

public record RequestDataDTO(String request_type, String request_details, int entity_type, int company_fk, String operation_by) {
}
