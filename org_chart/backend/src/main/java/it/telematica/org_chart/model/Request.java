package it.telematica.org_chart.model;

import it.telematica.org_chart.converter.ApprovalStatusConverter;
import it.telematica.org_chart.enums.ApprovalStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "requests", schema = "org_chart")
public class Request {
    @Id
    private int id;
    private String requestType;
    private String requestDetails;
    @Column(columnDefinition = "TINYINT(1)", name = "entity_type")
    private Integer entityType;
    @ManyToOne
    @JoinColumn(name = "company_fk", referencedColumnName = "id")
    private Company company;
    @Column(name = "is_approved")
    @Convert(converter = ApprovalStatusConverter.class)
    private ApprovalStatus isApproved;
    private LocalDateTime operationDate;
    private String operationBy;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
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

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public ApprovalStatus getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(ApprovalStatus isApproved) {
        this.isApproved = isApproved;
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