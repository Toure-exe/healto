package org.example.booking.Models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int BookingId;

    @Column(nullable = false)
    private String doctorEmail;

    @Column(nullable = false)
    private String patientEmail;

    @Column(nullable = false)
    private String bookingHour;

    @Setter
    @Getter
    @Column(nullable = false)
    private LocalDate bookingDate;



}
