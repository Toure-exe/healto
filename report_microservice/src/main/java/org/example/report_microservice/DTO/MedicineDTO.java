package org.example.report_microservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicineDTO {
    private String medicineName;
    private String medicineDosage;
    private String medicineFrequency;
    private int medicineDurationInDays;
}