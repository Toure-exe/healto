package org.example.report_microservice.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class DummyUserDetailsService implements UserDetailsService {
    /*
     * classe per creare un utente "finto" durante la validazione del token
     * valutare se interrogare auth_microservice per caricare il vero utente
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return User.builder()
                .username(email)
                .password("") // non usato perché il token è già stato validato
                .roles("USER") // ruolo finto
                .build();
    }
}