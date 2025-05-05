package org.example.report_microservice.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long MedicineId;

    private String medicineName;
    private String medicineDosage;
    private String medicineFrequency;
    private int medicineDurationInDays;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "therapy_id")
    private Therapy therapy;
}
