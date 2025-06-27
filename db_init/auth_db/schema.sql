-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Giu 27, 2025 alle 14:01
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
('joe.dalton@example.com', 'patient', '1990-10-10', 'CODFISC', 'Joe', '$2a$10$3v/bOhstNnV7.YoUGQp.RuhRXUIfJlbcgcX4HdkIwjWxuNc7kcbpW', 'Dalton'),
('lucky.luke@example.com', 'doctor', '1997-04-22', 'CODFISC1', 'lucky', '$2a$10$3UvM0gY4ujpoYxgdevCAPO7XqijTm9J7.dx8Ux6.aBNNLWGWTPLYm', 'luke');

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
