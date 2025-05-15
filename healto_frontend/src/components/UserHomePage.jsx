import { Link } from 'react-router-dom'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import healto_logo from '../assets/healto_logo.png';
import healto_img from '../assets/healto_img.png';

export default function UserHomePage() {
    const firstName = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
    const email = localStorage.getItem('email')
    const role = localStorage.getItem('role')

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-slate-600 text-white p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Benvenuto, {firstName} {lastName}</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                    Logout
                </button>
            </header>

            {/* Contenuto */}
            <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
            <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                <img src={healto_logo} alt="logo" width="15%" height="15%"/>
            </div>
                <p className="text-gray-600 mb-6">Email: {email}</p>
                
                <div className="space-x-2">
                    {role === 'patient' && (
                        <>
                           <Link to="/booking" > <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                Prenota visita
                            </button></Link>
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-green-700 transition">
                                Storico medico
                            </button>
                            <Link to="/booking-history"> <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-green-700 transition">
                                Storico visite
                            </button></Link>
                            <Link to="/profil"><button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-green-700 transition">
                                Profilo
                            </button></Link>
                        </>
                    )}
                    {role === 'doctor' && (
                        <>
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                Inserisci report
                            </button>
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-green-700 transition">
                                Storico report
                            </button>
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-green-700 transition">
                                Storico visite
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}
