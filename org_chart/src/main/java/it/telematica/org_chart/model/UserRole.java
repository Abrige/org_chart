package it.telematica.org_chart.model;

public enum UserRole {
    SYSTEM_ADMIN(2),
    COMPANY_ADMIN(1),
    USER(0);

    private final Integer userRole;

    UserRole(Integer userRole) {
        this.userRole = userRole;
    }

    public Integer getUserRole() {
        return userRole;
    }
}
