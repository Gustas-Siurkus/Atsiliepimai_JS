-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2023 at 10:33 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `atsiliepimai`
--

-- --------------------------------------------------------

--
-- Table structure for table `atsiliepimai`
--

CREATE TABLE `atsiliepimai` (
  `id` int(10) UNSIGNED NOT NULL,
  `vardas` varchar(255) NOT NULL,
  `pastas` varchar(255) NOT NULL,
  `vertinimas` tinyint(3) UNSIGNED NOT NULL,
  `tekstas` text NOT NULL,
  `laikas` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `atsiliepimai`
--

INSERT INTO `atsiliepimai` (`id`, `vardas`, `pastas`, `vertinimas`, `tekstas`, `laikas`) VALUES
(1, 'Lavruha', 'laurisgaming12@gmail.com', 1, 'Nepatiko, bet nu tipo', '2023-11-08 23:15:18'),
(2, 'Betmenas', 'karalius12@gmail.com', 10, 'Buna pasitaiko', '2023-11-08 23:16:07'),
(3, 'Lavruha', 'laurisgaming12@gmail.com', 2, 'Nepatiko, bet nu tipo', '2023-11-08 23:16:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `atsiliepimai`
--
ALTER TABLE `atsiliepimai`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `atsiliepimai`
--
ALTER TABLE `atsiliepimai`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
