-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2023 at 04:38 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ams`
--

-- --------------------------------------------------------

--
-- Table structure for table `auctions`
--

CREATE TABLE `auctions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auctions`
--

INSERT INTO `auctions` (`id`, `name`, `description`, `image_url`) VALUES
(47, 'BMW', 'BMW 320i very good condition and fabric', '1683556029998.jpg'),
(48, 'Peugeot ', 'Peugeot very good condition and fabric', '1683556146938.jpg'),
(49, 'Peugeot ', 'Peugeot very good condition', '1683556160210.jpg'),
(50, 'Peugeot ', 'Peugeot very good condition', '1683556170785.jpg'),
(51, 'Peugeot ', 'Peugeot very good condition', '1683556172452.jpg'),
(52, 'Scoda', 'Scoda very good condition', '1683556201746.jpg'),
(53, 'Scoda', 'Scoda very good condition', '1683556203960.jpg'),
(54, 'Scoda', 'Scoda very good condition', '1683556205312.jpg'),
(55, 'Scoda', 'Scoda very good condition', '1683556213059.jpg'),
(56, 'Scoda', 'Scoda very good condition', '1683556214981.jpg'),
(57, 'Scoda vrs', 'Scoda very good condition', '1683556221695.jpg'),
(58, 'Scoda vrs', 'Scoda very good condition', '1683556231995.jpg'),
(59, 'Scoda vrs', 'Scoda very good condition', '1683556233681.jpg'),
(60, 'BMW', 'BMW very good condition', '1683556289621.jpg'),
(61, 'BMW', 'BMW very good condition', '1683556291665.jpg'),
(62, 'BMW', 'BMW very good condition', '1683556293323.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'inactive',
  `type` enum('admin','seller','bidder') NOT NULL,
  `token` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `phone`, `status`, `type`, `token`) VALUES
(18, 'aliaa@gmail.com', '$2b$10$yYzYbU0ZxY8yVl5pLd67mO33mZLfsTDapk47dyz6DXX3n7FuyseDm', 1236547862, 'inactive', 'seller', 0),
(19, 'aya@gmail.com', '$2b$10$ScYvAHkxSFStLRs3w9d1fuZXcDglewmZ.7n4ywp0Ru97GJ0BpQ0Ou', 2147483647, 'inactive', 'bidder', 1),
(20, 'mohamed@gmail.com', '$2b$10$TEfaGJI4FvXSzIXB4FuzGeEPrLFW/UIFDgrjKbL3uej413mr9PHSG', 12358865, 'inactive', 'bidder', 832);

-- --------------------------------------------------------

--
-- Table structure for table `user_auction_bid`
--

CREATE TABLE `user_auction_bid` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `auction_id` int(11) NOT NULL,
  `bid` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_auction_bid`
--

INSERT INTO `user_auction_bid` (`id`, `user_id`, `auction_id`, `bid`) VALUES
(17, 19, 51, 30000),
(18, 19, 52, 32056);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auctions`
--
ALTER TABLE `auctions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_auction_bid`
--
ALTER TABLE `user_auction_bid`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_constr_id` (`user_id`),
  ADD KEY `auction_constr_id` (`auction_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auctions`
--
ALTER TABLE `auctions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `user_auction_bid`
--
ALTER TABLE `user_auction_bid`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_auction_bid`
--
ALTER TABLE `user_auction_bid`
  ADD CONSTRAINT `auction_constr_id` FOREIGN KEY (`auction_id`) REFERENCES `auctions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_constr_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
