package org.example.report_microservice.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReportAndTherapyDTO {
    //IDs and keys
    private String patientEmail;
    private String doctorEmail;
    private int reportId;
    private int therapyId;
    private LocalDate reportDate;
    //report info
    private double bloodPressure;
    private String bloodType;
    private double temperature;
    private double weight;
    private double height;
    private String symptoms;
    private String clinicalNotes;
    //therapy
    private String therapyDescription;
    // Medicine info
    private List<MedicineDTO> medicines;

}
