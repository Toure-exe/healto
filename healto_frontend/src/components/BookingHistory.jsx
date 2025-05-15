import { useEffect, useState } from "react";
import axiosBooking from "../api/axiosBooking";
import { Link } from "react-router-dom";

export default function BookingHistory() {
    const [bookingHistory, setBookingHistory] = useState([]);

    useEffect(() => {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        if (!email || !token) {
            alert("Utente non autenticato.");
            return;
        }

        axiosBooking
            .get(`http://localhost:8082/api/booking/patient/get-patient-booking-list?email=${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setBookingHistory(res.data);
            })
            .catch((err) => {
                console.error("Errore nel recupero dello storico prenotazioni:", err);
                alert("Errore durante il caricamento dello storico.");
            });
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Storico visite mediche</h1>

            {bookingHistory.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border border-gray-300">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="p-3 border">Data</th>
                                <th className="p-3 border">Ora</th>
                                <th className="p-3 border">Medico</th>
                                <th className="p-3 border">ID Prenotazione</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingHistory.map((booking) => (
                                <tr key={booking.bookingId} className="text-center hover:bg-gray-100">
                                    <td className="p-2 border">{booking.date}</td>
                                    <td className="p-2 border">{booking.hours}</td>
                                    <td className="p-2 border">{booking.doctorEmail}</td>
                                    <td className="p-2 border">{booking.bookingId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Nessuna prenotazione trovata.</p>
            )}

            <div className="mt-6">
                <Link to="/user-home">
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Torna alla home
                    </button>
                </Link>
            </div>
        </div>
    );
}
