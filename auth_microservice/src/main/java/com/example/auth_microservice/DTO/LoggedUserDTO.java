package com.example.auth_microservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoggedUserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String token;
    private String role;
}
