package com.example.auth_microservice.services;

import com.example.auth_microservice.DTO.DoctorDTO;
import com.example.auth_microservice.DTO.LoginRequestDTO;
import com.example.auth_microservice.DTO.User;
import com.example.auth_microservice.DTO.RegisterRequestDTO;
import com.example.auth_microservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;

    public boolean insertUser(RegisterRequestDTO dto) {
        boolean result = false;

        if (!userRepository.existsByEmail(dto.getEmail())) {
            if(userRepository.findByFiscalCode(dto.getFiscalCode()).isEmpty()) {

                User user = new User();
                user.setEmail(dto.getEmail());
                user.setPassword(dto.getPassword());
                user.setName(dto.getName());
                user.setSurname(dto.getSurname());
                user.setFiscalCode(dto.getFiscalCode());
                user.setBirthDate(dto.getBirthDate());
                user.setRole(dto.getRole());

                User saved = userRepository.save(user);
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
        Optional<User> userData = userRepository.findByEmail(dto.getEmail());

        if (userData.isPresent()) {
            User user = userData.get();

            if (user.getPassword().equals(dto.getPassword())) {
                token = jwtService.generateToken((userRepository.findByEmail(dto.getEmail())).get());
            }

        }
        return token;
    }

    public List<DoctorDTO> getDoctors() {
        List<DoctorDTO> doctorsList = new ArrayList<>();
        List<User> doctors = userRepository.findByRole("doctor");
        for (User user : doctors) {
            DoctorDTO doctorDTO = new DoctorDTO();
            doctorDTO.setEmail(user.getEmail());
            doctorDTO.setName(user.getName());
            doctorDTO.setSurname(user.getSurname());
            doctorsList.add(doctorDTO);
        }
        return doctorsList;
    }
}
