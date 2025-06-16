-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Giu 16, 2025 alle 02:39
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking_microservice_db`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `booking_date` date NOT NULL,
  `booking_hour` varchar(255) NOT NULL,
  `doctor_email` varchar(255) NOT NULL,
  `patient_email` varchar(255) NOT NULL,
  `is_accepted_by_doctor` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `booking`
--

INSERT INTO `booking` (`booking_id`, `booking_date`, `booking_hour`, `doctor_email`, `patient_email`, `is_accepted_by_doctor`) VALUES
(1, '2025-05-01', '10:00', 'mario.rossi@example.com', 'yuri.cechi@example.com', b'0'),
(2, '2025-05-14', '13:00', 'mario.rossi@example.com', 'yuri.cechi@example.com', b'0'),
(3, '2025-05-15', '10:00', 'mario.rossi@example.com', 'toure.isso@gmail.com', b'1'),
(4, '2025-05-20', '10:00', 'mario.rossi@example.com', 'yuri.cechi@example.com', b'1'),
(5, '2025-06-03', '12:00', 'mario.rossi@example.com', 'toure.isso@gmail.com', b'1'),
(6, '2025-06-12', '10:00', 'mario.rossi@example.com', 'toure.isso@gmail.com', b'1'),
(7, '2025-06-13', '08:00', 'mario.rossi@example.com', 'toure.isso@gmail.com', b'0'),
(8, '2025-06-04', '11:00', 'mario.rossi@example.com', 'luigi.bianchi@example.com', b'1'),
(9, '2025-06-09', '08:00', 'lucky.luke@example.com', 'luigi.bianchi@example.com', b'1'),
(10, '2025-06-12', '10:00', 'lucky.luke@example.com', 'luigi.bianchi@example.com', b'0'),
(11, '2025-06-11', '13:00', 'lucky.luke@example.com', 'luigi.bianchi@example.com', b'0'),
(12, '2025-06-13', '08:00', 'lucky.luke@example.com', 'luigi.bianchi@example.com', b'1');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
