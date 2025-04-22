package com.example.auth_microservice.repository;

import com.example.auth_microservice.DTO.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, String> {
    boolean existsByEmail(String email);
    Optional<Patient> findByEmail(String email);
    Optional<Patient> findByFiscalCode(String fiscalCode);
}
