-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Apr 15, 2025 alle 16:25
-- Versione del server: 10.4.28-MariaDB
-- Versione PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `org_chart`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `iso` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `countries`
--

INSERT INTO `countries` (`id`, `name`, `iso`) VALUES
(1, 'Andorra', 'AD'),
(2, 'Austria', 'AT'),
(3, 'Bosnia and Herzegovina', 'BA'),
(4, 'Belgium', 'BE'),
(5, 'Bulgaria', 'BG'),
(6, 'Belarus', 'BY'),
(7, 'Switzerland', 'CH'),
(8, 'Czech Republic', 'CZ'),
(9, 'Germany', 'DE'),
(10, 'Denmark', 'DK'),
(11, 'Estonia', 'EE'),
(12, 'Spain', 'ES'),
(13, 'Finland', 'FI'),
(14, 'France', 'FR'),
(15, 'United Kingdom', 'GB'),
(16, 'Greece', 'GR'),
(17, 'Croatia', 'HR'),
(18, 'Hungary', 'HU'),
(19, 'Ireland', 'IE'),
(20, 'Iceland', 'IS'),
(21, 'Italy', 'IT'),
(22, 'Liechtenstein', 'LI'),
(23, 'Lithuania', 'LT'),
(24, 'Luxembourg', 'LU'),
(25, 'Latvia', 'LV'),
(26, 'Monaco', 'MC'),
(27, 'Moldova, Republic of', 'MD'),
(28, 'Montenegro', 'ME'),
(29, 'Macedonia, the Former Yugoslav Republic of', 'MK'),
(30, 'Malta', 'MT'),
(31, 'Netherlands', 'NL'),
(32, 'Norway', 'NO'),
(33, 'Poland', 'PL'),
(34, 'Portugal', 'PT'),
(35, 'Romania', 'RO'),
(36, 'Serbia', 'RS'),
(37, 'Russian Federation', 'RU'),
(38, 'Sweden', 'SE'),
(39, 'Slovenia', 'SI'),
(40, 'Slovakia', 'SK'),
(41, 'San Marino', 'SM'),
(42, 'Ukraine', 'UA');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
