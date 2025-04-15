-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Apr 15, 2025 alle 15:23
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
-- Struttura della tabella `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `mail` varchar(300) NOT NULL,
  `password` varchar(50) NOT NULL,
  `employee_fk` int(11) DEFAULT NULL,
  `user_role` tinyint(4) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `accounts_companies`
--

CREATE TABLE `accounts_companies` (
  `id` int(11) NOT NULL,
  `account_fk` int(11) NOT NULL,
  `company_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `country_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `name` int(255) NOT NULL,
  `fiscal_code` int(100) NOT NULL,
  `city_fk` int(11) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `num_of_employee` int(11) NOT NULL DEFAULT 0,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `iso` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `birthdate` timestamp NULL DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  `city_fk` int(11) DEFAULT NULL,
  `company_fk` int(11) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `employees_hierarchies`
--

CREATE TABLE `employees_hierarchies` (
  `id` int(11) NOT NULL,
  `superior_fk` int(11) NOT NULL,
  `subordinate_fk` int(11) NOT NULL,
  `is_valid` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `record_id` int(11) NOT NULL,
  `record_table` varchar(255) NOT NULL,
  `operation_type` char(1) NOT NULL,
  `account_fk` int(11) NOT NULL,
  `operation_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `operation_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `request_type` char(1) NOT NULL,
  `request_details` varchar(1000) NOT NULL,
  `entity_type` tinyint(1) NOT NULL,
  `account_fk` int(11) NOT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT 0,
  `operation_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `operation_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_employee_employees` (`employee_fk`);

--
-- Indici per le tabelle `accounts_companies`
--
ALTER TABLE `accounts_companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_account_accounts` (`account_fk`),
  ADD KEY `fk_company_companies` (`company_fk`);

--
-- Indici per le tabelle `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_country_countries` (`country_fk`) USING BTREE;

--
-- Indici per le tabelle `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_city_cities` (`city_fk`);

--
-- Indici per le tabelle `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_employees_city` (`city_fk`),
  ADD KEY `fk_employees_company` (`company_fk`);

--
-- Indici per le tabelle `employees_hierarchies`
--
ALTER TABLE `employees_hierarchies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_eh_superior` (`superior_fk`),
  ADD KEY `fk_eh_subordinate` (`subordinate_fk`);

--
-- Indici per le tabelle `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_history_account` (`account_fk`);

--
-- Indici per le tabelle `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_requests_account` (`account_fk`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `accounts_companies`
--
ALTER TABLE `accounts_companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `employees_hierarchies`
--
ALTER TABLE `employees_hierarchies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `fk_employee_employees` FOREIGN KEY (`employee_fk`) REFERENCES `employees` (`id`);

--
-- Limiti per la tabella `accounts_companies`
--
ALTER TABLE `accounts_companies`
  ADD CONSTRAINT `fk_account_accounts` FOREIGN KEY (`account_fk`) REFERENCES `accounts` (`id`),
  ADD CONSTRAINT `fk_company_companies` FOREIGN KEY (`company_fk`) REFERENCES `companies` (`id`);

--
-- Limiti per la tabella `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `fk_countries_cities` FOREIGN KEY (`country_fk`) REFERENCES `countries` (`id`);

--
-- Limiti per la tabella `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `fk_city_cities` FOREIGN KEY (`city_fk`) REFERENCES `cities` (`id`);

--
-- Limiti per la tabella `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `fk_employees_city` FOREIGN KEY (`city_fk`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `fk_employees_company` FOREIGN KEY (`company_fk`) REFERENCES `companies` (`id`);

--
-- Limiti per la tabella `employees_hierarchies`
--
ALTER TABLE `employees_hierarchies`
  ADD CONSTRAINT `fk_eh_subordinate` FOREIGN KEY (`subordinate_fk`) REFERENCES `employees` (`id`),
  ADD CONSTRAINT `fk_eh_superior` FOREIGN KEY (`superior_fk`) REFERENCES `employees` (`id`);

--
-- Limiti per la tabella `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `fk_history_account` FOREIGN KEY (`account_fk`) REFERENCES `accounts` (`id`);

--
-- Limiti per la tabella `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `fk_requests_account` FOREIGN KEY (`account_fk`) REFERENCES `accounts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
