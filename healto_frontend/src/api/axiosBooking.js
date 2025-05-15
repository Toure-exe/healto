// src/api/axiosInstance.js
import axios from "axios";

const axiosBooking = axios.create({
    baseURL: "http://localhost:8082",
});

// Aggiunge il token a ogni richiesta
axiosBooking.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosBooking;
