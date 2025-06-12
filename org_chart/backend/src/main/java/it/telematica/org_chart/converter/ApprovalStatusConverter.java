package it.telematica.org_chart.converter;

import it.telematica.org_chart.enums.ApprovalStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class ApprovalStatusConverter implements AttributeConverter<ApprovalStatus, Integer> {

    @Override
    public Integer convertToDatabaseColumn(ApprovalStatus attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.getValue();
    }

    @Override
    public ApprovalStatus convertToEntityAttribute(Integer dbData) {
        if (dbData == null) {
            return null;
        }
        return ApprovalStatus.fromValue(dbData);
    }
}

