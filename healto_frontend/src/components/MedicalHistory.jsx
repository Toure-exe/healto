import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import healto_logo from '../assets/healto_logo.png';

export default function MedicalHistory() {
    const [reportList, setReportList] = useState([]);

    useEffect(() => {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        let url = "";

        if (!email || !token) {
            alert("Utente non autenticato.");
            return;
        }

        if(role == "patient"){
            url = `http://localhost:8083/api/report/patient/report?email=${email}&role=${role}`;
        }
        else if (role == "doctor"){
            url = `http://localhost:8083/api/report/doctor/report?email=${email}&role=${role}`
        }

        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setReportList(res.data);
            })
            .catch((err) => {
                console.error("Errore nel recupero dello storico medico:", err);
                alert("Errore durante il caricamento dello storico.");
            });
    }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
            <div align="center"><img src={healto_logo} alt="logo" width="15%" height="15%" /></div>
            <h1 className="text-2xl font-bold mb-6">Storico medico</h1>

            {reportList.length > 0 ? (
                <div className="space-y-6">
                    {reportList.map((report) => (
                        <div
                            key={report.reportId}
                            className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:shadow transition"
                        >
                            <h2 className="text-lg font-semibold text-blue-700 mb-2">
                                Email del {localStorage.getItem("role") == "patient" ? ("medico: "+report.doctorEmail) : ("paziente: " +report.patientEmail)}
                            </h2>
                            <h2 className="text-lg font-semibold text-purple-700 mb-2">
                                Report scritto in data: {report.reportDate}
                            </h2>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p><strong>Id prenotazione:</strong> {report.bookingId} </p>
                                    <p><strong>Pressione sanguigna:</strong> {report.bloodPressure} mmHg</p>
                                    <p><strong>Temperatura:</strong> {report.temperature} °C</p>
                                    <p><strong>Peso:</strong> {report.weight} kg</p>
                                    <p><strong>Altezza:</strong> {report.height} cm</p>
                                    <p><strong>Gruppo sanguigno:</strong> {report.bloodType}</p>
                                </div>
                                <div>
                                    <p><strong>Descrizione sintomi:</strong> {report.symptoms}</p>
                                    <p><strong>Note cliniche:</strong> {report.clinicalNotes}</p>
                                    <p><strong>Terapia:</strong> {report.therapyDescription || "Nessuna terapia prescritta"}</p>
                                    <div>
                                        <strong>Farmaci:</strong>
                                        {report.medicines.length > 0 ? (
                                            <ul className="list-disc ml-6 mt-1 space-y-1">
                                                {report.medicines.map((m, idx) => (
                                                    <li key={idx}>
                                                        <span className="font-medium">{m.medicineName}</span>: 
                                                        {` ${m.medicineDosage}, ${m.medicineFrequency}, per ${m.medicineDurationInDays} giorni`}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="ml-2">Nessun farmaco prescritto</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nessun report medico disponibile.</p>
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
