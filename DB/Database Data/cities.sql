-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Apr 16, 2025 alle 09:57
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
-- Struttura della tabella `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `country_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `cities`
--

INSERT INTO `cities` (`id`, `name`, `country_fk`) VALUES
(1, 'Andorra la Vella', 1),
(2, 'Vienna', 2),
(3, 'Graz', 2),
(4, 'Linz', 2),
(5, 'Salzburg', 2),
(6, 'Sarajevo', 3),
(7, 'Banja Luka', 3),
(8, 'Tuzla', 3),
(9, 'Mostar', 3),
(10, 'Brussels', 4),
(11, 'Antwerp', 4),
(12, 'Ghent', 4),
(13, 'Charleroi', 4),
(14, 'Sofia', 5),
(15, 'Plovdiv', 5),
(16, 'Varna', 5),
(17, 'Burgas', 5),
(18, 'Minsk', 6),
(19, 'Gomel', 6),
(20, 'Mogilev', 6),
(21, 'Vitebsk', 6),
(22, 'Zurich', 7),
(23, 'Geneva', 7),
(24, 'Basel', 7),
(25, 'Bern', 7),
(26, 'Prague', 8),
(27, 'Brno', 8),
(28, 'Ostrava', 8),
(29, 'Plzeň', 8),
(30, 'Berlin', 9),
(31, 'Hamburg', 9),
(32, 'Munich', 9),
(33, 'Cologne', 9),
(34, 'Copenhagen', 10),
(35, 'Aarhus', 10),
(36, 'Odense', 10),
(37, 'Aalborg', 10),
(38, 'Tallinn', 11),
(39, 'Tartu', 11),
(40, 'Narva', 11),
(41, 'Pärnu', 11),
(42, 'Madrid', 12),
(43, 'Barcelona', 12),
(44, 'Valencia', 12),
(45, 'Seville', 12),
(46, 'Helsinki', 13),
(47, 'Espoo', 13),
(48, 'Tampere', 13),
(49, 'Vantaa', 13),
(50, 'Paris', 14),
(51, 'Marseille', 14),
(52, 'Lyon', 14),
(53, 'Toulouse', 14),
(54, 'London', 15),
(55, 'Birmingham', 15),
(56, 'Manchester', 15),
(57, 'Glasgow', 15),
(58, 'Athens', 16),
(59, 'Thessaloniki', 16),
(60, 'Patras', 16),
(61, 'Heraklion', 16),
(62, 'Zagreb', 17),
(63, 'Split', 17),
(64, 'Rijeka', 17),
(65, 'Osijek', 17),
(66, 'Budapest', 18),
(67, 'Debrecen', 18),
(68, 'Szeged', 18),
(69, 'Miskolc', 18),
(70, 'Dublin', 19),
(71, 'Cork', 19),
(72, 'Limerick', 19),
(73, 'Galway', 19),
(74, 'Reykjavik', 20),
(75, 'Kópavogur', 20),
(76, 'Hafnarfjörður', 20),
(77, 'Akureyri', 20),
(78, 'Rome', 21),
(79, 'Milan', 21),
(80, 'Naples', 21),
(81, 'Turin', 21),
(82, 'Vaduz', 22),
(83, 'Schaan', 22),
(84, 'Vilnius', 23),
(85, 'Kaunas', 23),
(86, 'Klaipėda', 23),
(87, 'Šiauliai', 23),
(88, 'Luxembourg City', 24),
(89, 'Esch-sur-Alzette', 24),
(90, 'Riga', 25),
(91, 'Daugavpils', 25),
(92, 'Liepāja', 25),
(93, 'Jelgava', 25),
(94, 'Monaco', 26),
(95, 'Monte Carlo', 26),
(96, 'Chișinău', 27),
(97, 'Tiraspol', 27),
(98, 'Bălți', 27),
(99, 'Podgorica', 28),
(100, 'Nikšić', 28),
(101, 'Herceg Novi', 28),
(102, 'Skopje', 29),
(103, 'Bitola', 29),
(104, 'Kumanovo', 29),
(105, 'Valletta', 30),
(106, 'Birkirkara', 30),
(107, 'Mosta', 30),
(108, 'Amsterdam', 31),
(109, 'Rotterdam', 31),
(110, 'The Hague', 31),
(111, 'Utrecht', 31),
(112, 'Oslo', 32),
(113, 'Bergen', 32),
(114, 'Trondheim', 32),
(115, 'Stavanger', 32),
(116, 'Warsaw', 33),
(117, 'Kraków', 33),
(118, 'Łódź', 33),
(119, 'Wrocław', 33),
(120, 'Lisbon', 34),
(121, 'Porto', 34),
(122, 'Vila Nova de Gaia', 34),
(123, 'Amadora', 34),
(124, 'Bucharest', 35),
(125, 'Cluj-Napoca', 35),
(126, 'Timișoara', 35),
(127, 'Iași', 35),
(128, 'Belgrade', 36),
(129, 'Novi Sad', 36),
(130, 'Niš', 36),
(131, 'Kragujevac', 36),
(132, 'Moscow', 37),
(133, 'Saint Petersburg', 37),
(134, 'Novosibirsk', 37),
(135, 'Yekaterinburg', 37),
(136, 'Stockholm', 38),
(137, 'Gothenburg', 38),
(138, 'Malmö', 38),
(139, 'Uppsala', 38),
(140, 'Ljubljana', 39),
(141, 'Maribor', 39),
(142, 'Celje', 39),
(143, 'Kranj', 39),
(144, 'Bratislava', 40),
(145, 'Košice', 40),
(146, 'Prešov', 40),
(147, 'Žilina', 40),
(148, 'San Marino', 41),
(149, 'Serravalle', 41),
(150, 'Kyiv', 42),
(151, 'Kharkiv', 42),
(152, 'Odesa', 42),
(153, 'Dnipro', 42);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_country_countries` (`country_fk`) USING BTREE;

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `fk_countries_cities` FOREIGN KEY (`country_fk`) REFERENCES `countries` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
