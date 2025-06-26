import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import healto_logo from '../assets/healto_logo.png';
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [fiscalCode, setFiscalCode] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [role, setRole] = useState('patient'); // valore predefinito
    const [birthDate, setBirthDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            alert('Le password non coincidono.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/register', {
                email,
                fiscalCode,
                password,
                name,
                surname,
                role,
                birthDate, // Assicurati che sia nel formato dd/MM/yyyy lato backend
            });

            alert(JSON.stringify(response.data));
            navigate("/");

        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                alert(`Errore: ${JSON.stringify(error.response.data)}`);
            } else {
                alert('Si è verificato un errore.');
            }
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-md bg-white p-8 shadow-md rounded-xl">
                    <div align="center"><img src={healto_logo} alt="logo" width="30%" height="30%" /></div>
                    <h2 className="text-2xl font-semibold text-center mb-6">Registrati</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Nome"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Cognome"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Codice Fiscale"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={fiscalCode}
                            onChange={(e) => setFiscalCode(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                      <input
                            type="date"
                            placeholder="Data di nascita"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            required
                        />
                        <select
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="patient">Paziente</option>
                            <option value="doctor">Medico</option>
                        </select>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Ripeti Password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Registrati
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-center">
                        Hai già un account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Accedi
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
