package it.telematica.org_chart.model;

import jakarta.persistence.*;
import org.hibernate.annotations.Immutable;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Immutable
@Table(name = "v_requests", schema = "org_chart")
public class Request {
    @Id
    private Integer id;
    private String requestType;
    private String entityType;
    private Integer companyId;
    private String companyName;
    private String isRequestApproved;
    private LocalDateTime operationDate; // viene mappato in automatico da hibernate prendendo il timestamp dal database
    private String operationBy;
    private Integer accountId;
    // serve per mostrare i dati dal join della tabella many to many che abbiamo creato sul database
    @ManyToMany
    @JoinTable(name = "accounts_requests",
            joinColumns = @JoinColumn(name = "account_fk"),
            inverseJoinColumns = @JoinColumn(name = "request_fk"))
    private Set<Request> request = new HashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getIsRequestApproved() {
        return isRequestApproved;
    }

    public void setIsRequestApproved(String isRequestApproved) {
        this.isRequestApproved = isRequestApproved;
    }

    public LocalDateTime getOperationDate() {
        return operationDate;
    }

    public void setOperationDate(LocalDateTime operationDate) {
        this.operationDate = operationDate;
    }

    public String getOperationBy() {
        return operationBy;
    }

    public void setOperationBy(String operationBy) {
        this.operationBy = operationBy;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public Set<Request> getRequest() {
        return request;
    }

    public void setRequest(Set<Request> request) {
        this.request = request;
    }
}
