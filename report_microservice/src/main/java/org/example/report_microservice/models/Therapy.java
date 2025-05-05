package org.example.report_microservice.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Therapy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int therapyId;

    private String therapyDescription;

    @OneToOne
    @JoinColumn(name = "report_id", nullable = false, unique = true)
    private Report report;

    @OneToMany(mappedBy = "therapy", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Medicine> medicines;
}
