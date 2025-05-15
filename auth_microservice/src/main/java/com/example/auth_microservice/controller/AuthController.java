package com.example.auth_microservice.controller;

import ch.qos.logback.core.model.Model;
import com.example.auth_microservice.DTO.*;
import com.example.auth_microservice.services.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@Controller
public class AuthController {

    @Autowired
    private AuthService authServices;

    @RequestMapping("/login")
    public ResponseEntity<LoggedUserDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        ResponseEntity<LoggedUserDTO> response = null;
        LoggedUserDTO result = authServices.login(loginRequestDTO);
        if (result != null)
            response = ResponseEntity.status(HttpStatus.OK).body(result);
        else
            response = ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

        return response;
    }

    @RequestMapping("/login/sso-google")
    public void loginGoogle(HttpServletResponse response) throws IOException {
        System.out.println("sso-ggogle<<<");
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
    public ResponseEntity<String> loginSuccess(@RequestParam("token") String token) {
        System.out.println("---> TOKEN: "+token);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    @RequestMapping("/get-doctor-list")
    public ResponseEntity<List<DoctorDTO>> getDoctorList(){
       List<DoctorDTO> doctors = authServices.getDoctors();
       if(doctors != null && !doctors.isEmpty())
           return  ResponseEntity.ok(doctors);
       else
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    @PutMapping("/user")
    public ResponseEntity<String> updateUser(@RequestBody UserDTO userDTO) {
        ResponseEntity<String> response = null;
        if(userDTO == null ){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }else{
            boolean result = authServices.updateUser(userDTO);
            if(result)
                return  ResponseEntity.status(HttpStatus.OK).body("success");
            else
                return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<UserDTO> getUser(@RequestParam("email") String email) {
        System.out.println("--->ENTROOOO  email: "+email);
        UserDTO result = authServices.getUserByEmail(email);
        if(result != null)
            return  ResponseEntity.status(HttpStatus.OK).body(result);
        else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}
