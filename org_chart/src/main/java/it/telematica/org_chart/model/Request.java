package it.telematica.org_chart.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
@Entity
@Table(name = "requests", schema = "org_chart")
public class Request {
    @Id
    private Integer id;
    private Character requestType;
    private String requestDetails;
    @Column(columnDefinition = "TINYINT(1)", name = "entity_type")
    private Integer entityType; // TODO rivedere come gestire i tipi di entità
    @ManyToOne
    @JoinColumn(name = "account_fk", referencedColumnName = "id")
    private Account account;
    @Column(columnDefinition = "TINYINT(1)", name = "is_approved")
    private boolean isApproved;
    private LocalDateTime operationDate;
    private String operationBy;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Character getRequestType() {
        return requestType;
    }

    public void setRequestType(Character requestType) {
        this.requestType = requestType;
    }

    public String getRequestDetails() {
        return requestDetails;
    }

    public void setRequestDetails(String requestDetails) {
        this.requestDetails = requestDetails;
    }

    public Integer getEntityType() {
        return entityType;
    }

    public void setEntityType(Integer entityType) {
        this.entityType = entityType;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
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
}
