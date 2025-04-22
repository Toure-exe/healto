import { Link } from 'react-router-dom'
import Header from './Header'

export default function RegisterPage() {
    return (
        <>
            <Header/>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-md bg-white p-8 shadow-md rounded-xl">
                    <h2 className="text-2xl font-semibold text-center mb-6">Registrati</h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nome"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    )
}
