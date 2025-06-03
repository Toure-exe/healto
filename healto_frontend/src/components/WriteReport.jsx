import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

export default function WriteReport() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const bookingId = params.get("bookingId");
    const patientEmail = params.get("patientEmail");
    const doctorEmail = localStorage.getItem("email");
    const [file, setFile] = useState(null);


    const [formData, setFormData] = useState({
        bloodPressure: "",
        bloodType: "",
        temperature: "",
        weight: "",
        height: "",
        symptoms: "",
        clinicalNotes: "",
        therapyDescription: "",
        medicines: [{ medicineName: "", medicineDosage: "", medicineFrequency:"",  medicineDurationInDays:""}],
    });

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
            medicines: [...prev.medicines, { medicineName: "", medicineDosage: "", medicineFrequency: "", medicineDurationInDays: "", 
                medicineDurationInDays: ""
             }],
        }));
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
      
        const today = new Date().toISOString().split("T")[0];
      
        // Prepara il DTO
        const dto = {
          bookingId,
          patientEmail,
          doctorEmail,
          reportDate: today,
          ...formData,
        };
      
        // Crea FormData
        const formDataToSend = new FormData();
        
        // Aggiungi il file solo se presente
        if (file) {
          formDataToSend.append("file", file);
        }
      
        // Aggiungi DTO come JSON stringificata (assumendo che il backend accetti un campo JSON)
        formDataToSend.append("reportAndTherapyDTO", new Blob([JSON.stringify(dto)], { type: "application/json" }));
      
        try {
          await axios.post("http://localhost:8083/api/report/doctor/insert-report", formDataToSend, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
          alert("Report inserito con successo");
          navigate("/user-home");
        } catch (err) {
          console.error("Errore durante l'invio del report:", err);
          alert("Errore nell'inserimento del report.");
        }
      };
      

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6">Inserisci report medico</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="bloodPressure" placeholder="Pressione sanguigna" onChange={handleChange} className="input border p-2 rounded" required />
                    <input type="text" name="bloodType" placeholder="Gruppo sanguigno" onChange={handleChange} className="input border p-2 rounded" required />
                    <input type="number" name="temperature" placeholder="Temperatura" step="0.1" onChange={handleChange} className="input border p-2 rounded" required />
                    <input type="number" name="weight" placeholder="Peso (kg)" step="0.1" onChange={handleChange} className="input border p-2 rounded" required />
                    <input type="number" name="height" placeholder="Altezza (cm)" step="0.1" onChange={handleChange} className="input border p-2 rounded" required />
                </div>

                <textarea name="symptoms" placeholder="Sintomi" onChange={handleChange} className="w-full p-2 border rounded" required />
                <textarea name="clinicalNotes" placeholder="Note cliniche" onChange={handleChange} className="w-full p-2 border rounded" required />
                <textarea name="therapyDescription" placeholder="Descrizione terapia" onChange={handleChange} className="w-full p-2 border rounded" required />

                <input 
                    type="file"
                    accept=".zip"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Medicinali</h3>
                    {formData.medicines.map((med, index) => (
                        <div key={index} className="grid grid-cols-7 gap-2 items-center">
                            <input
                                type="text"
                                name="medicineName"
                                value={med.medicineName}
                                onChange={(e) => handleMedicineChange(index, e)}
                                placeholder="Nome medicinale"
                                className="col-span-2 p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="medicineDosage"
                                value={med.medicineDosage}
                                onChange={(e) => handleMedicineChange(index, e)}
                                placeholder="Dosaggio"
                                className="col-span-2 p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="medicineFrequency"
                                value={med.medicineFrequency || ""}
                                onChange={(e) => handleMedicineChange(index, e)}
                                placeholder="Frequenza (es. 1 volta al giorno)"
                                className="col-span-2 p-2 border rounded"
                                required
                            />
                            <input
                                type="number"
                                name="medicineDurationInDays"
                                value={med.medicineDurationInDays || ""}
                                onChange={(e) => handleMedicineChange(index, e)}
                                placeholder="Durata (giorni)"
                                className="p-2 border rounded"
                                min={1}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => removeMedicineField(index)}
                                className="text-red-600 hover:text-red-800"
                                title="Rimuovi medicinale"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={addMedicineField} className="text-blue-600 hover:underline mt-2">
                        + Aggiungi medicinale
                    </button>
                </div>

                <div className="flex space-x-4 pt-4">
                    <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                        Invia report
                    </button>
                    <Link to="/user-home">
                        <button type="button" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                            Torna alla home
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
