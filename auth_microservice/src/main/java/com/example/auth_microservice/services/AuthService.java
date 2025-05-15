package com.example.auth_microservice.services;

import com.example.auth_microservice.DTO.*;
import com.example.auth_microservice.repository.UserRepository;
import jakarta.transaction.Transactional;
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

    public LoggedUserDTO login(LoginRequestDTO dto) {
        LoggedUserDTO result = new LoggedUserDTO();
        Optional<User> userData = userRepository.findByEmail(dto.getEmail());

        if (userData.isPresent()) {
            User user = userData.get();
            result.setEmail(user.getEmail());
            result.setFirstName(user.getName());
            result.setLastName(user.getSurname());
            result.setRole(user.getRole());

            if (user.getPassword().equals(dto.getPassword())) {
                result.setToken(jwtService.generateToken((userRepository.findByEmail(dto.getEmail())).get()));
            }

        }
        return result;
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

    public UserDTO getUserByEmail(String email) {
        UserDTO userDTO = new UserDTO();
        Optional<User> userData = userRepository.findByEmail(email);
        if (userData.isPresent()) {
            User user = userData.get();
            userDTO.setEmail(user.getEmail());
            userDTO.setName(user.getName());
            userDTO.setSurname(user.getSurname());
            userDTO.setFiscalCode(user.getFiscalCode());
            userDTO.setBirthDate(user.getBirthDate());
            userDTO.setRole(user.getRole());
        }

        return userDTO;
    }

    @Transactional
    public boolean updateUser(UserDTO dto) {
        Optional<User> existingUserOptional = userRepository.findById(dto.getEmail());

        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();

            existingUser.setFiscalCode(dto.getFiscalCode());
            //existingUser.setPassword(dto.getPassword());
            existingUser.setName(dto.getName());
            existingUser.setSurname(dto.getSurname());
            existingUser.setRole(dto.getRole());
            existingUser.setBirthDate(dto.getBirthDate());

            userRepository.save(existingUser);
            return true;
        } else {

            return false;
        }
    }
}
