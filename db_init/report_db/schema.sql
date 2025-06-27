-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Giu 27, 2025 alle 14:03
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

--
-- Dump dei dati per la tabella `medicine`
--

INSERT INTO `medicine` (`medicine_id`, `medicine_dosage`, `medicine_duration_in_days`, `medicine_frequency`, `medicine_name`, `therapy_id`) VALUES
(6, '2.5mg', 30, '1 volta al giorno', 'Bisoprololo', 5),
(7, '2.5mg', 30, '1 volta al giorno', 'zerinol', 6),
(8, '2mg', 5, '3 volte al giorno', 'zerinol', 7),
(9, '4mg', 3, 'ccc', 'Doliprane', 8),
(10, 'ddd', 4, 'ddd', 'ddd', 9),
(20, '2mg', 5, '3 volte al giorno', 'ASMR', 10),
(21, '1mg', 1, '1 volta al giorno', 'ASPIRINA 2', 10),
(24, '2mg', 1, '5 volte al giorno', 'paracetamol', 11),
(25, '2mg', 1, '3 volte al giorno', 'Aspirina', 12);

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

--
-- Dump dei dati per la tabella `report`
--

INSERT INTO `report` (`report_id`, `blood_pressure`, `blood_type`, `clinical_notes`, `doctor_email`, `height`, `patient_email`, `report_date`, `symptoms`, `temperature`, `weight`, `booking_id`) VALUES
(5, 120.5, 'A+', 'Possibile aritmia', 'mario.rossi@example.com', 175, 'yuri.cechi@example.com', '2025-05-05', 'Palpitazioni e stanchezza', 36.8, 70.5, 0),
(6, 123.5, 'A+', 'Possibile aritmia', 'mario.rossi@example.com', 175, 'yuri.cechi@example.com', '2025-05-22', 'stanchezza', 35.8, 73, 0),
(7, 120, 'O+', 'aaa bbb', 'mario.rossi@example.com', 180, 'toure.isso@gmail.com', '2025-06-05', 'aaa bbb', 33.3, 80, 3),
(8, 122, 'AB+', 'ccc', 'mario.rossi@example.com', 75, 'yuri.cechi@example.com', '2025-06-05', 'ccc', 34, 78, 4),
(9, 121, 'O+', 'dddd', 'mario.rossi@example.com', 180, 'toure.isso@gmail.com', '2025-06-05', 'dddd', 33.32, 80, 5),
(10, 123, 'B+', 'vvvv CCC', 'mario.rossi@example.com', 175, 'luigi.bianchi@example.com', '2025-06-25', 'vvv', 32, 80, 8),
(11, 121, 'B-', 'AAAA', 'lucky.luke@example.com', 179, 'luigi.bianchi@example.com', '2025-06-25', 'zzzz', 34, 74, 12),
(12, 120, 'AB+', 'QQQQ', 'lucky.luke@example.com', 170, 'luigi.bianchi@example.com', '2025-06-25', 'QQQQ', 29.8, 78, 9);

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
-- Dump dei dati per la tabella `therapy`
--

INSERT INTO `therapy` (`therapy_id`, `therapy_description`, `report_id`) VALUES
(5, 'Beta-bloccanti', 5),
(6, 'Beta-bloccanti', 6),
(7, 'Sessione di ASMR', 7),
(8, 'ccc', 8),
(9, 'dddd', 9),
(10, 'vvvv CC', 10),
(11, 'CCCC', 11),
(12, 'QQQQQQ', 12);

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
  MODIFY `medicine_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT per la tabella `report`
--
ALTER TABLE `report`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT per la tabella `therapy`
--
ALTER TABLE `therapy`
  MODIFY `therapy_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
