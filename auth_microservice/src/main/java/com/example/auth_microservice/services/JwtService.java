package com.example.auth_microservice.services;
import com.example.auth_microservice.DTO.Patient;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {
    private final String secretKey = "chiaveSuperSegreta12345"; // usa un valore forte in produzione
    private final long expirationMs = 600000; // 10 minuti

    public String generateToken(Patient user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("email", user.getName())
                .claim("surname", user.getSurname())
                .claim("fiscalCode", user.getFiscalCode())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}
