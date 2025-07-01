-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Lug 01, 2025 alle 04:24
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
-- Database: `report_microservice_db`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `medicine`
--

CREATE TABLE `medicine` (
  `medicine_id` bigint(20) NOT NULL,
  `medicine_dosage` varchar(255) DEFAULT NULL,
  `medicine_duration_in_days` int(11) NOT NULL,
  `medicine_frequency` varchar(255) DEFAULT NULL,
  `medicine_name` varchar(255) DEFAULT NULL,
  `therapy_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `report`
--

CREATE TABLE `report` (
  `report_id` int(11) NOT NULL,
  `blood_pressure` double NOT NULL,
  `blood_type` varchar(255) DEFAULT NULL,
  `clinical_notes` varchar(1000) DEFAULT NULL,
  `doctor_email` varchar(255) NOT NULL,
  `height` double NOT NULL,
  `patient_email` varchar(255) NOT NULL,
  `report_date` date NOT NULL,
  `symptoms` varchar(255) DEFAULT NULL,
  `temperature` double NOT NULL,
  `weight` double NOT NULL,
  `booking_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `therapy`
--

CREATE TABLE `therapy` (
  `therapy_id` int(11) NOT NULL,
  `therapy_description` varchar(255) DEFAULT NULL,
  `report_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`medicine_id`),
  ADD KEY `FKlpctgt1ndcahtlk4xxletr4am` (`therapy_id`);

--
-- Indici per le tabelle `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`report_id`);

--
-- Indici per le tabelle `therapy`
--
ALTER TABLE `therapy`
  ADD PRIMARY KEY (`therapy_id`),
  ADD UNIQUE KEY `UK1ue5496o5xwe5pf1bi5e20irc` (`report_id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `medicine`
--
ALTER TABLE `medicine`
  MODIFY `medicine_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT per la tabella `report`
--
ALTER TABLE `report`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT per la tabella `therapy`
--
ALTER TABLE `therapy`
  MODIFY `therapy_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `medicine`
--
ALTER TABLE `medicine`
  ADD CONSTRAINT `FKlpctgt1ndcahtlk4xxletr4am` FOREIGN KEY (`therapy_id`) REFERENCES `therapy` (`therapy_id`);

--
-- Limiti per la tabella `therapy`
--
ALTER TABLE `therapy`
  ADD CONSTRAINT `FKojjtqob7tdkjxsh6qm8ifpcko` FOREIGN KEY (`report_id`) REFERENCES `report` (`report_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
