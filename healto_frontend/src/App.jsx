import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import HomePage from './components/HomePage'
import UserHomePage from './components/UserHomePage'
import UserProfile from './components/UserProflie'
import './App.css'
import Booking from './components/Booking'
import BookingHistory from './components/BookingHistory'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user-home" element={<UserHomePage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/profil" element={<UserProfile />} />
      </Routes>
    </>
    
  )
}

export default App
