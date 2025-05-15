import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from './Header'
import healto_logo from '../assets/healto_logo.png';

function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/login', {
                email,
                password
            })

            const { token, role, firstName, lastName, email: userEmail } = response.data

            localStorage.setItem('token', token)
            localStorage.setItem('firstName', firstName)
            localStorage.setItem('lastName', lastName)
            localStorage.setItem('email', userEmail)
            localStorage.setItem('role', role)

            navigate('/user-home')
        } catch (error) {
            console.error('Errore durante il login', error)
            alert('Credenziali non valide')
        }
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
                <div align="center"><img src={healto_logo} alt="logo" width="15%" height="15%"/></div>
                <div className="p-10 mx-auto md:w-full md:max-w-md">
                    <h1 className="font-bold text-center text-2xl mb-5">Login</h1>
                    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200 px-5 py-7">
                        <label className="text-sm text-gray-600 block mb-1">E-mail</label>
                        <input
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="border rounded-lg px-3 py-2 mb-4 text-sm w-full"
                        />
                        <label className="text-sm text-gray-600 block mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="border rounded-lg px-3 py-2 mb-4 text-sm w-full"
                        />
                        <button
                            onClick={handleLogin}
                            className="bg-blue-600 text-white w-full py-2.5 rounded-lg hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                        <Link to="/" >
                                        <span class="inline-block ml-1">Back to homepage</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage
