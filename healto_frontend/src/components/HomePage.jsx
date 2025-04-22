import { Link } from 'react-router-dom'
import Header from './Header'

export default function HomePage() {
    return (
        <>
            <Header />
            <div className="bg-gray-100 flex flex-col items-center justify-center px-4">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">Benvenuto nella Home</h1>
                <p className="mb-6 text-gray-600">Naviga tra le pagine di Login e Registrazione</p>
                <div className="space-x-4">
                    <Link
                        to="/login"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        Registrati
                    </Link>
                </div>
            </div>
        </>

    )
}
