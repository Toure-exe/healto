package com.example.auth_microservice.security;

import com.example.auth_microservice.DTO.LoggedUserDTO;
import com.example.auth_microservice.DTO.User;
import com.example.auth_microservice.repository.UserRepository;
import com.example.auth_microservice.services.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public OAuth2SuccessHandler(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User user = oauthToken.getPrincipal();

        String email = user.getAttribute("email");
        String name = user.getAttribute("given_name");
        String surname = user.getAttribute("family_name");

        User patient = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setName(name);
                    newUser.setSurname(surname);
                    newUser.setRole("patient");
                    newUser.setPassword("oauth2_google");
                    newUser.setFiscalCode("google");
                    newUser.setBirthDate(LocalDate.parse("2025-01-01"));
                    return userRepository.save(newUser);
                });

        String jwt = jwtService.generateToken(patient);

        // Crea il DTO
        LoggedUserDTO dto = new LoggedUserDTO();
        dto.setFirstName(patient.getName());
        dto.setLastName(patient.getSurname());
        dto.setEmail(patient.getEmail());
        dto.setRole(patient.getRole());
        dto.setToken(jwt);

        // Serializza e codifica in URL-safe JSON
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(dto);
        String encodedJson = URLEncoder.encode(json, StandardCharsets.UTF_8);

        // Redirect alla homepage con DTO
        response.sendRedirect("http://localhost:5173/?user=" + encodedJson);
    }

}
