import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Header from './Header';
import healto_img from '../assets/healto_img.png';
import healto_logo from '../assets/healto_logo.png';

export default function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userParam = params.get("user");

        if (userParam) {
            try {
                const decodedJson = decodeURIComponent(userParam);
                const user = JSON.parse(decodedJson);

                localStorage.setItem("firstName", user.firstName);
                localStorage.setItem("lastName", user.lastName);
                localStorage.setItem("email", user.email);
                localStorage.setItem("token", user.token);
                localStorage.setItem("role", user.role);
                
                navigate("/user-home");

            } catch (error) {
                console.error("Errore nel parsing del parametro user:", error);
            }
        }
    }, []);

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/login/sso-google";
    };

    return (
        <>
            <Header />
            <div className="bg-gray-100 flex flex-col items-center justify-center px-4">
                <br/>
                <br/>
                <img src={healto_logo} alt="logo" width="15%" height="15%"/>
                <br/><h1 className="text-4xl font-bold mb-4 text-gray-800">Benvenuto nella Home</h1>
                <p className="mb-6 text-gray-600">Naviga tra le pagine di Login e Registrazione</p>
                <div className="space-x-4 mb-4">
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

                {/* Bottone Login con Google */}
                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center space-x-2 px-6 py-2 border border-gray-300 bg-white rounded-lg shadow hover:bg-gray-100 transition"
                >
                    {/* Icona Google */}
                    <svg className="w-5 h-5" viewBox="0 0 488 512" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#EA4335" d="M488 261.8C488 403.3 391.1 512 248 512 110.8 512 0 401.2 0 264S110.8 16 248 16c66.8 0 124.3 24.6 168.1 64.9l-68.1 65.3C319.1 106.7 286 96 248 96c-83.6 0-151.1 68.3-151.1 152s67.5 152 151.1 152c72.5 0 120.6-41.2 128.8-98.8H248v-78.4h240z"/>
                    </svg>
                    <span className="text-gray-700">Login con Google</span>
                </button>

                <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible mt-6">
                    <img src={healto_img} alt="banner"/>
                </div>
            </div>
        </>
    );
}
