export const canEdit = (role, companyId, adminForCompanies, employeeForCompanies) => {
    if (adminForCompanies && Array.isArray(adminForCompanies) && adminForCompanies.includes(companyId)) {
        return true;
    }
    if (employeeForCompanies && Array.isArray(employeeForCompanies) && employeeForCompanies.includes(companyId)) {
        return true;
    }
    return role === 3;
}