package com.example.auth_microservice.DTO;

import lombok.*;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDTO {
    private String email;
    private String fiscalCode;
    private String password;
    private String name;
    private String role;
    private String surname;
    @Setter
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate birthDate;

}
