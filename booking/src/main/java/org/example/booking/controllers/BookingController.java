package org.example.booking.controllers;

import org.example.booking.DTO.BookingDTO;
import org.example.booking.DTO.DateHoursDTO;
import org.example.booking.Models.Booking;
import org.example.booking.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;


    @GetMapping("/get-doctor-booking-list")
    public ResponseEntity<List<DateHoursDTO>> getDoctorBookingsById(@RequestParam("email") String email){
        System.out.println(email);
        if(email.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(bookingService.getBookingsByDoctorId(email));
    }

    @RequestMapping("/insert-booking") //dopo controllare se il booking inserito non "esiste già"
    public ResponseEntity<String> insertBooking(@RequestBody BookingDTO bookingDTO){

        boolean success = bookingService.insertBooking(bookingDTO);
        if (success) {
            return ResponseEntity.ok("Booking inserito con successo");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Errore durante l'inserimento del booking");
        }
    }

    //getBookingListByPatientId
    //getBookingListByDoctorId
}
