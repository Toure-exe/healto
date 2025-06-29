import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { X } from "lucide-react";

export default function WriteReport() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const role = localStorage.getItem("role");
    const bookingId = params.get("bookingId");
    const patientEmailAddress = params.get("patientEmail");
    const bookingDate = params.get("bookingDate");
    const doctorEmail = localStorage.getItem("email");
    const [file, setFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [reportId, setReportId] = useState(null);
    const [resultMessage, setResultMessage] = useState("");

    const [formData, setFormData] = useState({
        bloodPressure: "",
        bloodType: "",
        temperature: "",
        weight: "",
        reportDate: "",
        height: "",
        symptoms: "",
        patientEmail: "",
        clinicalNotes: "",
        therapyDescription: "",
        medicines: [
            {
                medicineId: "",
                medicineName: "",
                medicineDosage: "",
                medicineFrequency: "",
                medicineDurationInDays: "",
            },
        ],
    });

    useEffect(() => {
        const fetchReport = async () => {
            if (!bookingId) return;
            const token = localStorage.getItem("token");

            try {
                const res = await axios.get(
                    `http://localhost:8083/api/report/doctor/report/by-booking?bookingId=${bookingId}&role=${role}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (res.data) {
                    const report = res.data;
                    setFormData({
                        bloodPressure: report.bloodPressure,
                        bloodType: report.bloodType,
                        temperature: report.temperature,
                        weight: report.weight,
                        reportDate: report.reportDate,
                        height: report.height,
                        symptoms: report.symptoms,
                        patientEmail: report.patientEmail,
                        clinicalNotes: report.clinicalNotes,
                        therapyDescription: report.therapyDescription,
                        medicines: report.medicines || [],
                    });

                    setIsEditing(true);
                    setReportId(report.reportId);
                }
            } catch (err) {
                if (err.response && err.response.status !== 404) {
                    console.error("Errore nel recupero del report:", err);
                }
            }
        };

        fetchReport();
    }, [bookingId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleMedicineChange = (index, e) => {
        const { name, value } = e.target;
        const newMeds = [...formData.medicines];
        newMeds[index][name] = value;
        setFormData((prev) => ({ ...prev, medicines: newMeds }));
    };

    const removeMedicineField = (index) => {
        setFormData((prev) => ({
            ...prev,
            medicines: prev.medicines.filter((_, i) => i !== index),
        }));
    };

    const addMedicineField = () => {
        setFormData((prev) => ({
            ...prev,
            medicines: [
                ...prev.medicines,
                {
                    medicineId: "",
                    medicineName: "",
                    medicineDosage: "",
                    medicineFrequency: "",
                    medicineDurationInDays: "",
                },
            ],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const today = new Date().toISOString().split("T")[0];
        console.log("patient email: ",patientEmailAddress);
        console.log("today: ",today);
        

        const dto = {
            ...formData,
            bookingId,
            patientEmail: patientEmailAddress,
            doctorEmail,
            reportDate: today,
            reportId: reportId || 0,
        };

        const formDataToSend = new FormData();
        if (file) {
            formDataToSend.append("file", file);
        }

        formDataToSend.append(
            "reportAndTherapyDTO",
            new Blob([JSON.stringify(dto)], { type: "application/json" })
        );

        console.log("DTO JSON:", JSON.stringify(dto));

        try {
            const url = `http://localhost:8083/api/report/doctor/report`;
            const method = isEditing ? "put" : "post";

            const res = await axios({
                method,
                url,
                data: formDataToSend,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data && file) {
                let predictionJson;

                if (typeof res.data === "string") {
                    const match = res.data.match(/\{.*\}/s);
                    predictionJson = match ? JSON.parse(match[0]) : {};
                } else {
                    predictionJson = res.data;
                }

                if (predictionJson.class_distribution) {
                    const entries = Object.entries(
                        predictionJson.class_distribution
                    );
                    const [maxClass, maxData] = entries.reduce(
                        (max, entry) =>
                            entry[1].percentage > max[1].percentage ? entry : max,
                        entries[0]
                    );
                    setResultMessage(
                        `Dati inseriti. Predizione classe aritmia: ${maxClass} (${maxData.percentage}%)`
                    );
                } else {
                    setResultMessage(`Dati correttamente inseriti`);
                }
            } else {
                setResultMessage(`Dati correttamente inseriti`);
            }
        } catch (err) {
            console.error("Errore durante l'invio del report:", err);
            alert("Errore nell'invio del report.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6">Inserisci report medico </h2>
            <h2 className="text-2xl font-bold mb-4">  Email del paziente: {patientEmailAddress}</h2>
            <h2 className="text-2xl font-bold mb-4">  Sostenuto in data: {bookingDate}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1">Pressione sanguigna</label>
                        <input
                            type="number"
                            name="bloodPressure"
                            value={formData.bloodPressure}
                            onChange={handleChange}
                            placeholder="Pressione sanguigna"
                            className="input border p-2 rounded w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Gruppo sanguigno</label>
                        <input
                            type="text"
                            name="bloodType"
                            value={formData.bloodType}
                            onChange={handleChange}
                            placeholder="Gruppo sanguigno"
                            className="input border p-2 rounded w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Temperatura</label>
                        <input
                            type="number"
                            name="temperature"
                            value={formData.temperature}
                            onChange={handleChange}
                            placeholder="Temperatura"
                            step="0.1"
                            className="input border p-2 rounded w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Peso (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            placeholder="Peso (kg)"
                            step="0.1"
                            className="input border p-2 rounded w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Altezza (cm)</label>
                        <input
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            placeholder="Altezza (cm)"
                            step="0.1"
                            className="input border p-2 rounded w-full"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1">Sintomi</label>
                    <textarea
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleChange}
                        placeholder="Sintomi"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Note cliniche</label>
                    <textarea
                        name="clinicalNotes"
                        value={formData.clinicalNotes}
                        onChange={handleChange}
                        placeholder="Note cliniche"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Descrizione terapia</label>
                    <textarea
                        name="therapyDescription"
                        value={formData.therapyDescription}
                        onChange={handleChange}
                        placeholder="Descrizione terapia"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Carica file ZIP (ECG)</label>
                    <input
                        type="file"
                        accept=".zip"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <p className="mt-2 text-sm text-green-600">{resultMessage}</p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Medicinali</h3>
                    {formData.medicines.map((med, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-7 gap-2 items-center border p-2 rounded"
                        >
                            <div className="col-span-2">
                                <label className="block mb-1">Nome medicinale</label>
                                <input
                                    type="text"
                                    name="medicineName"
                                    value={med.medicineName}
                                    onChange={(e) => handleMedicineChange(index, e)}
                                    placeholder="Nome medicinale"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block mb-1">Dosaggio</label>
                                <input
                                    type="text"
                                    name="medicineDosage"
                                    value={med.medicineDosage}
                                    onChange={(e) => handleMedicineChange(index, e)}
                                    placeholder="Dosaggio"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block mb-1">Frequenza</label>
                                <input
                                    type="text"
                                    name="medicineFrequency"
                                    value={med.medicineFrequency || ""}
                                    onChange={(e) => handleMedicineChange(index, e)}
                                    placeholder="Frequenza"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Durata (giorni)</label>
                                <input
                                    type="number"
                                    name="medicineDurationInDays"
                                    value={med.medicineDurationInDays || ""}
                                    onChange={(e) => handleMedicineChange(index, e)}
                                    placeholder="Durata (giorni)"
                                    className="w-full p-2 border rounded"
                                    min={1}
                                    required
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => removeMedicineField(index)}
                                className="text-red-600 hover:text-red-800 mt-6"
                                title="Rimuovi medicinale"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addMedicineField}
                        className="text-blue-600 hover:underline mt-2"
                    >
                        + Aggiungi medicinale
                    </button>
                </div>

                <div className="flex space-x-4 pt-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                        {isEditing ? "Aggiorna report" : "Invia report"}
                    </button>
                    <Link to="/user-home">
                        <button
                            type="button"
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Torna alla home
                        </button>
                    </Link>
                    <Link to="/doctor-appointments?mode=report">
                        <button
                            type="button"
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Torna indietro
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
