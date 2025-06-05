import { Link } from 'react-router-dom'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import healto_logo from '../assets/healto_logo.png';
import healto_img from '../assets/healto_img.png';
import healto_home from '../assets/healto_home.png';

export default function UserHomePage() {
    const firstName = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
    const role = localStorage.getItem('role')
    const email = localStorage.getItem('email');

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-slate-600 text-white p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">HealthTo</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                    Logout
                </button>
            </header>

            {/* Contenuto */}
            <main className="flex-grow flex flex-col items-center justify-center px-4 py-10 bg-gray-50">
                {/* Logo centrale */}
                <div className="mb-6">
                    <img src={healto_home} alt="logo" className="w-48 h-auto" />
                </div>

                {/* Card utente */}
                <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md text-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Benvenuto, {firstName} {lastName}
                    </h2>
                    <p className="text-gray-500">{email}</p>
                    <p className="text-sm mt-2 px-4 py-1 bg-blue-100 text-blue-800 inline-block rounded-full">
                        Ruolo: {role === 'patient' ? 'Paziente' : 'Medico'}
                    </p>
                </div>

                {/* Azioni */}
                <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
                    {role === 'patient' && (
                        <>
                            <Link to="/booking">
                                <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white text-lg rounded-xl hover:bg-blue-700 transition">
                                    📅 Prenota visita
                                </button>
                            </Link>
                            <Link to="/medical-history">
                                <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white text-lg rounded-xl hover:bg-green-700 transition">
                                    📖 Storico medico
                                </button>
                            </Link>
                            <Link to="/booking-history">
                                <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 text-white text-lg rounded-xl hover:bg-purple-700 transition">
                                    🕒 Storico visite
                                </button>
                            </Link>
                            <Link to="/profil">
                                <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white text-lg rounded-xl hover:bg-indigo-700 transition">
                                    🙍 Profilo
                                </button>
                            </Link>
                        </>
                    )}
                    {role === 'doctor' && (
                        <>
                            <Link to="/doctor-appointments?mode=report">
                                <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white text-lg rounded-xl hover:bg-blue-700 transition">
                                    📝 Inserisci report
                                </button>
                            </Link>
                            <Link to="/medical-history">
                                <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white text-lg rounded-xl hover:bg-green-700 transition">
                                    📖 Storico report
                                </button>
                            </Link>
                            <Link to="/doctor-appointments?mode=view">
                                <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 text-white text-lg rounded-xl hover:bg-purple-700 transition">
                                    🕒 Storico visite
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </main>


        </div>
    )
}
