import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosAuth from "../api/axiosAuth";
import axiosBooking from "../api/axiosBooking";
import { Link } from 'react-router-dom';

export default function Booking() {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorEmail, setSelectedDoctorEmail] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [occupiedSlots, setOccupiedSlots] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState("");

    const allSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"];

    useEffect(() => {
        axiosAuth.get("http://localhost:8080/get-doctor-list")
            .then(res => setDoctors(res.data))
            .catch(err => console.error("Errore nel recupero dei medici:", err));
    }, []);

    useEffect(() => {
        if (selectedDoctorEmail && selectedDate) {
            const dateStr = selectedDate.toLocaleDateString("en-CA");;
            axiosBooking.get(`http://localhost:8082/api/booking/get-doctor-booking-list?email=${selectedDoctorEmail}&date=${dateStr}`)
                .then(res => {
                    const occupied = res.data.map(booking => booking.hours);
                    setOccupiedSlots(occupied);
                })
                .catch(err => console.error("Errore nel recupero degli slot occupati:", err));
        }
    }, [selectedDoctorEmail, selectedDate]);

    useEffect(() => {
        const freeSlots = allSlots.filter(slot => !occupiedSlots.includes(slot));
        setAvailableSlots(freeSlots);
    }, [occupiedSlots]);

    const handleBooking = async () => {
        const patientEmail = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        if (!patientEmail || !token) {
            alert("Utente non autenticato.");
            return;
        }

        const formattedDate = selectedDate.toLocaleDateString("en-CA");;

        const payload = {
            medicEmail: selectedDoctorEmail,
            patientEmail: patientEmail,
            date: formattedDate,
            hours: selectedSlot
        };

        try {
            await axiosBooking.post(
                "http://localhost:8082/api/booking/patient/insert-booking",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            alert("Prenotazione effettuata con successo!");
        } catch (error) {
            console.error("Errore durante la prenotazione:", error);
            alert("Errore nella prenotazione. Riprova.");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Prenota una visita</h1>

            <label className="block mb-2 text-sm font-medium">Seleziona un medico:</label>
            <select
                className="w-full border p-2 mb-4 rounded"
                value={selectedDoctorEmail}
                onChange={(e) => setSelectedDoctorEmail(e.target.value)}
            >
                <option value="">-- Seleziona un medico --</option>
                {doctors.map((doctor) => (
                    <option key={doctor.email} value={doctor.email}>
                        {doctor.name} {doctor.surname}
                    </option>
                ))}
            </select>

            <label className="block mb-2 text-sm font-medium">Seleziona una data:</label>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full border p-2 mb-4 rounded"
                dateFormat="yyyy-MM-dd"
                placeholderText="Scegli una data"
            />

            {availableSlots.length > 0 && (
                <>
                    <label className="block mb-2 text-sm font-medium">Orari disponibili:</label>
                    <select
                        className="w-full border p-2 mb-4 rounded"
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                    >
                        <option value="">-- Seleziona un orario --</option>
                        {availableSlots.map((slot) => (
                            <option key={slot} value={slot}>
                                {slot}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {selectedDoctorEmail && selectedDate && selectedSlot && (
                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                    onClick={handleBooking}
                >
                    Prenota
                </button>
            )}

            <br /><br /><br />
            <Link to="/user-home">
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Torna alla home
                </button>
            </Link>
        </div>
    );
}
