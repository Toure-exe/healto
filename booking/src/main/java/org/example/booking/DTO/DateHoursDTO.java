package org.example.booking.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

/*
* DA AGGIORNARE: METTERE ANCHE L'ID DEL BOOKING, L'EMAIL, IL NOME E IL COGNOME DEL PAZIENTE
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DateHoursDTO {
    private LocalDate date;
    private String hours;
    private String doctorEmail;
}
