package it.telematica.org_chart.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "history", schema = "org_chart")
public class History {
    @Id
    private Integer id;
    private Integer recordId;
    private String recordTable;
    private Character operationType;
    @ManyToOne
    @JoinColumn(name = "account_fk", referencedColumnName = "id")
    private Account account;
    private LocalDateTime operationDate;
    private String operationBy;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRecordId() {
        return recordId;
    }

    public void setRecordId(Integer recordId) {
        this.recordId = recordId;
    }

    public String getRecordTable() {
        return recordTable;
    }

    public void setRecordTable(String recordTable) {
        this.recordTable = recordTable;
    }

    public Character getOperationType() {
        return operationType;
    }

    public void setOperationType(Character operationType) {
        this.operationType = operationType;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
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
