import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DoctorAppointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const doctorEmail = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        if (!doctorEmail || !token) {
            alert("Utente non autenticato.");
            return;
        }

        axios
            .get(`http://localhost:8082/api/booking/get-doctor-booking-list?email=${doctorEmail}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setAppointments(res.data);
            })
            .catch((err) => {
                console.error("Errore nel recupero degli appuntamenti:", err);
                alert("Errore durante il caricamento degli appuntamenti.");
            });
    }, []);

    const handleConfirm = (bookingId) => {
        const token = localStorage.getItem("token");

        axios
            .put(
                "http://localhost:8082/api/booking/doctor/confirm-booking",
                bookingId,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                // Ricarica la pagina dopo la conferma
                window.location.reload();
            })
            .catch((err) => {
                console.error("Errore durante la conferma:", err);
                alert("Errore nella conferma dell'appuntamento.");
            });
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Appuntamenti prenotati</h1>

            {appointments.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border border-gray-300">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="p-3 border">Data</th>
                                <th className="p-3 border">Ora</th>
                                <th className="p-3 border">Paziente</th>
                                <th className="p-3 border">ID Prenotazione</th>
                                <th className="p-3 border">Stato prenotazione</th>
                                <th className="p-3 border">Azione</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appt) => (
                                <tr key={appt.bookingId} className="text-center hover:bg-gray-100">
                                    <td className="p-2 border">{appt.date}</td>
                                    <td className="p-2 border">{appt.hours}</td>
                                    <td className="p-2 border">{appt.patientEmail}</td>
                                    <td className="p-2 border">{appt.bookingId}</td>
                                    <td className="p-2 border">{appt.acceptedByDoctor ? "Confermato" : "Non confermato"}</td>
                                    <td className="p-2 border">
                                        {!appt.acceptedByDoctor && (
                                                <button
                                                    onClick={() => handleConfirm(appt.bookingId)}
                                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                                >
                                                    Conferma avvenimento
                                                </button>
                                            )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Nessun appuntamento prenotato.</p>
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
