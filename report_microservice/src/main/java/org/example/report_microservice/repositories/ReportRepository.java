package org.example.report_microservice.repositories;

import org.example.report_microservice.models.Report;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReportRepository extends CrudRepository<Report, Integer> {
    List<Report> findByDoctorEmail(String role);
    List<Report> findByPatientEmail(String role);
}
