import { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Campi modificabili
    const [birthDate, setBirthDate] = useState('');
    const [fiscalCode, setFiscalCode] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const email = localStorage.getItem("email");
    
                const response = await axios.get(`http://localhost:8080/user?email=${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                setUser(response.data);
                setBirthDate(response.data.birthDate || '');
                setFiscalCode(response.data.fiscalCode || '');
                setLoading(false);
            } catch (error) {
                console.error("Errore nel recupero dati utente:", error);
                setLoading(false);
            }
        };
    
        fetchUser();
    }, []);

    const handleSave = async () => {
        try {
            const updatedUser = {
                ...user,
                birthDate,
                fiscalCode
            };

            const token = localStorage.getItem("token");
            await axios.put("http://localhost:8080/user", updatedUser, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Dati aggiornati con successo!");
        } catch (error) {
            console.error("Errore nel salvataggio:", error);
            alert("Errore durante il salvataggio dei dati.");
        }
    };

    if (loading) {
        return <div className="text-center mt-10 text-gray-700">Caricamento...</div>;
    }

    if (!user) {
        return <div className="text-center mt-10 text-red-600">Utente non trovato</div>;
    }

    return (
        <>
            <Header />
            <div className="bg-gray-100 min-h-screen flex justify-center items-center px-4 py-10">
                <div className="bg-white rounded-2xl shadow p-8 w-full max-w-lg">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Profilo Utente</h1>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Nome</label>
                            <input type="text" value={user.name} readOnly className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Cognome</label>
                            <input type="text" value={user.surname} readOnly className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Email</label>
                            <input type="text" value={user.email} readOnly className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Ruolo</label>
                            <input type="text" value={user.role} readOnly className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Data di nascita</label>
                            <input
                                type="date"
                                value={birthDate}
                                onChange={e => setBirthDate(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Codice fiscale</label>
                            <input
                                type="text"
                                value={fiscalCode}
                                onChange={e => setFiscalCode(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <button
                            onClick={handleSave}
                            className="w-full mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Salva modifiche
                        </button>

                        <Link to="/user-home">
                            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition">
                                Torna alla home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
