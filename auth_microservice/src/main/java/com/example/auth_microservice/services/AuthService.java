package com.example.auth_microservice.services;

import com.example.auth_microservice.DTO.LoginRequestDTO;
import com.example.auth_microservice.DTO.Patient;
import com.example.auth_microservice.DTO.RegisterRequestDTO;
import com.example.auth_microservice.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private JwtService jwtService;

    public boolean insertUser(RegisterRequestDTO dto) {
        boolean result = false;

        if (!patientRepository.existsByEmail(dto.getEmail())) {
            if(patientRepository.findByFiscalCode(dto.getFiscalCode()).isEmpty()) {

                Patient patient = new Patient();
                patient.setEmail(dto.getEmail());
                patient.setPassword(dto.getPassword());
                patient.setName(dto.getName());
                patient.setSurname(dto.getSurname());
                patient.setFiscalCode(dto.getFiscalCode());
                patient.setBirthDate(dto.getBirthDate());

                Patient saved = patientRepository.save(patient);
                // Verifica inserimento riuscito
                if (saved.getFiscalCode().equals(dto.getFiscalCode())) {
                    result = true;
                }
            }

        }

        return result;
    }

    public String login(LoginRequestDTO dto) {
        String token = null;
        Optional<Patient> userData = patientRepository.findByEmail(dto.getEmail());

        if (userData.isPresent()) {
            Patient user = userData.get();

            if (user.getPassword().equals(dto.getPassword())) {
                token = jwtService.generateToken((patientRepository.findByEmail(dto.getEmail())).get());
            }

        }
        return token;
    }
}
