package it.telematica.org_chart.enums;

public enum ApprovalStatus {
    NOT_APPROVED(0),
    APPROVED(1),
    TO_REVIEW(2);

    private final int value;

    ApprovalStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static ApprovalStatus fromValue(int value) {
        for (ApprovalStatus status : ApprovalStatus.values()) {
            if (status.value == value) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown approval status: " + value);
    }
}

