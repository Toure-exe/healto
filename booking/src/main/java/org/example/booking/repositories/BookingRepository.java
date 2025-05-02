package org.example.booking.repositories;

import org.example.booking.Models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByDoctorEmail(String doctorEmail);
    List<Booking> findByPatientEmail(String patientEmail);
}
