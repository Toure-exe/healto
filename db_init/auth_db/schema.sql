-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Giu 16, 2025 alle 02:37
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
-- Database: `auth_microservice_db`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `user`
--

CREATE TABLE `user` (
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `birth_date` date NOT NULL,
  `fiscal_code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `user`
--

INSERT INTO `user` (`email`, `role`, `birth_date`, `fiscal_code`, `name`, `password`, `surname`) VALUES
('lucky.luke@example.com', 'doctor', '1989-05-14', 'CODFISC-LUKE', 'Lucky', 'supersegreta', 'Luke'),
('luigi.bianchi@example.com', 'patient', '1997-03-04', 'CODFISC-LUIGI', 'Luigi', 'supersegreta3', 'Banchi'),
('mario.rossi@example.com', 'doctor', '1980-03-12', 'CODICE FISCALE 2', 'Mario', 'supersegreta1', 'Rossi'),
('toure.isso@gmail.com', 'patient', '1999-04-01', 'CODMW3', 'toure', 'oauth2_google', 'ismaila'),
('yuri.cechi@example.com', 'patient', '1999-03-12', 'CODICE FISCALE 3', 'Jury', 'supersegreta', 'Cechi');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `UK8ofs9d72taja32f1eotjdro4h` (`fiscal_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
