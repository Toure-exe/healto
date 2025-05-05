package org.example.report_microservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reportId;

    @Column(nullable = false)
    private String patientEmail;

    @Column(nullable = false)
    private String doctorEmail;

    @Column(nullable = false)
    private LocalDate reportDate;

    private double bloodPressure;
    private String bloodType;
    private double temperature;
    private double weight;
    private double height;
    private String symptoms;

    @Column(length = 1000)
    private String clinicalNotes;

    @OneToOne(mappedBy = "report", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Therapy therapy;
}