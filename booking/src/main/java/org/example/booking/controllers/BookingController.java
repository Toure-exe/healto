package org.example.booking.controllers;

import org.example.booking.DTO.BookingDTO;
import org.example.booking.DTO.DateHoursDTO;
import org.example.booking.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;



    @GetMapping(value = "/get-doctor-booking-list")
    public ResponseEntity<List<DateHoursDTO>> getDoctorBookingsById(@RequestParam("email") String email, @RequestParam("date") LocalDate date) {
        System.out.println(email);
        if(email.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(bookingService.getBookingsById(email, "doctor", date));
    }

    @PreAuthorize("hasRole('PATIENT')")
    @RequestMapping("/patient/insert-booking") //dopo controllare se il booking inserito non "esiste già"
    public ResponseEntity<String> insertBooking(@RequestBody BookingDTO bookingDTO){

        boolean success = bookingService.insertBooking(bookingDTO);
        if (success) {
            return ResponseEntity.ok("Booking inserito con successo");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Errore durante l'inserimento del booking");
        }
    }

    @PreAuthorize("hasRole('PATIENT')")
    @GetMapping("/patient/get-patient-booking-list")
    public ResponseEntity<List<DateHoursDTO>> getPatientBookingsById(@RequestParam("email") String email){
        System.out.println(email);
        if(email.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(bookingService.getBookingsById(email, "patient",null));
    }

}
