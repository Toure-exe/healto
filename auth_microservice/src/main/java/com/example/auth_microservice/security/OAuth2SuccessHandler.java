package com.example.auth_microservice.security;

import com.example.auth_microservice.DTO.User;
import com.example.auth_microservice.repository.UserRepository;
import com.example.auth_microservice.services.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
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
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, org.springframework.security.core.Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User user = oauthToken.getPrincipal();

        String email = user.getAttribute("email");
        String name = user.getAttribute("given_name");
        String surname = user.getAttribute("family_name");

        // Verifica se l’utente esiste già
        User patient = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    // Se non esiste, crea un nuovo utente
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setName(name);
                    newUser.setSurname(surname);
                    newUser.setRole("patient");
                    newUser.setPassword("oauth2_google"); // oppure null
                    newUser.setFiscalCode("google"); // dummy unique ID
                    newUser.setBirthDate(LocalDate.parse("2025-01-01"));
                    return userRepository.save(newUser);
                });

        String jwt = jwtService.generateToken(patient);

        // Redirect con token nel frontend (es. localhost:3000)
        response.sendRedirect("http://localhost:8080/login-success?token=" + jwt); // MICROSERV COM
    }
}
