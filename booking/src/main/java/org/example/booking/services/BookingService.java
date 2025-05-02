package org.example.booking.services;

import org.example.booking.DTO.BookingDTO;
import org.example.booking.DTO.DateHoursDTO;
import org.example.booking.Models.Booking;
import org.example.booking.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<DateHoursDTO> getBookingsById(String email, String role) {
        List<Booking> bookings = new ArrayList<>();
        List<DateHoursDTO> hoursList = new ArrayList<>();
        if(email != null) {
            switch (role) {
                case "doctor":
                    bookings = bookingRepository.findByDoctorEmail(email);
                    break;
                case "patient":
                    bookings = bookingRepository.findByPatientEmail(email);
                    break;
            }

            for(Booking booking : bookings) {
                hoursList.add(new DateHoursDTO(booking.getBookingDate(), booking.getBookingHour(), booking.getDoctorEmail()));
            }

        }


        return hoursList;
    }

    public boolean insertBooking(BookingDTO bookingDTO) {
        Booking booking = new Booking();

        // Qui setti i campi
        booking.setDoctorEmail(bookingDTO.getMedicEmail());
        booking.setPatientEmail(bookingDTO.getPatientEmail());
        booking.setBookingDate(bookingDTO.getDate());
        booking.setBookingHour(bookingDTO.getHours());
        Booking result = bookingRepository.save(booking);

        return (result != null && result.getBookingId() != 0);
    }
}
