package com.example.auth_microservice.controller;

import ch.qos.logback.core.model.Model;
import com.example.auth_microservice.DTO.DoctorDTO;
import com.example.auth_microservice.DTO.LoginRequestDTO;
import com.example.auth_microservice.DTO.RegisterRequestDTO;
import com.example.auth_microservice.services.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;

@Controller
public class AuthController {

    @Autowired
    private AuthService authServices;

    @RequestMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        ResponseEntity<String> response = null;
        String token = authServices.login(loginRequestDTO);
        if (token != null)
            response = ResponseEntity.status(HttpStatus.OK).body(token);
        else
            response = ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");

        return response;
    }

    @RequestMapping("/login/sso-ggogle")
    public void loginGoogle(HttpServletResponse response) throws IOException {
        response.sendRedirect("/oauth2/authorization/google");
    }

    @RequestMapping("/register")
    public ResponseEntity<String>  register(@RequestBody RegisterRequestDTO request) {
        ResponseEntity<String>  response = null;
        if(!authServices.insertUser(request))
           response =  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("l'utente essiste già");
        else
            response = ResponseEntity.status(HttpStatus.CREATED).body("registrato");

        return response;
    }

    @RequestMapping("/login-success")
    public String loginSuccess(@RequestParam("token") String token) {
        System.out.println("---> TOKEN: "+token);
        return token;
    }

    @RequestMapping("/get-doctor-list")
    public ResponseEntity<DoctorDTO> getDoctorList(){
        return null;
    }
}
