-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2023 at 02:57 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `az_ecom_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `emaillists`
--

CREATE TABLE `emaillists` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emaillists`
--

INSERT INTO `emaillists` (`id`, `email`, `createdAt`, `updatedAt`) VALUES
(11, 'Ace@gmail.com', '2023-03-20 21:54:20', '2023-03-20 21:54:20');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `supervisor_id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `supervisor_id`, `full_name`, `login`, `password`) VALUES
(1, 1, 'John Doe', 'johndoe', 'password123'),
(2, 1, 'Jane Doe', 'janedoe', 'password456'),
(3, 2, 'Bob Smith', 'bobsmith', 'password789'),
(4, 2, 'Alice Johnson', 'alicejohnson', 'password321');

-- --------------------------------------------------------

--
-- Table structure for table `favourite_products`
--

CREATE TABLE `favourite_products` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favourite_products`
--

INSERT INTO `favourite_products` (`id`, `user_id`, `product_id`, `createdAt`, `updatedAt`) VALUES
(33, 65, 2, '2023-04-27 22:37:31', '2023-04-27 22:37:31'),
(36, 65, 8, '2023-04-27 22:37:34', '2023-04-27 22:37:34');

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `employee_id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `user_id`, `employee_id`, `full_name`, `address`, `phone_number`, `total`, `status`, `createdAt`, `updatedAt`) VALUES
(27, 68, 1, 'ouassim ouhinad', 'daoudiat-N4', '0674386253', '225.00', 'pending', '2023-05-14 15:55:46', '2023-05-14 15:55:46'),
(28, 68, 2, 'lead 2', 'njknd', '9349', '75.00', 'pending', '2023-05-14 15:56:08', '2023-05-14 15:56:08'),
(29, 68, 3, 'lead 3', 'j,kjsdc', 'isjdci', '25.00', 'pending', '2023-05-14 15:56:25', '2023-05-14 15:56:25'),
(30, 68, 4, 'lead 4', 'jnjnsdc', '96998', '104.00', 'pending', '2023-05-14 15:56:45', '2023-05-14 15:56:45'),
(31, 68, 1, 'ouassim ouhinad', 'daoudiat-N4', '0674386253', '75.00', 'pending', '2023-05-14 15:57:11', '2023-05-14 15:57:11');

-- --------------------------------------------------------

--
-- Table structure for table `lead_products`
--

CREATE TABLE `lead_products` (
  `id` int(11) NOT NULL,
  `lead_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lead_products`
--

INSERT INTO `lead_products` (`id`, `lead_id`, `product_id`, `quantity`) VALUES
(49, 27, 2, 1),
(50, 27, 3, 1),
(51, 27, 4, 1),
(52, 28, 2, 1),
(53, 29, 7, 1),
(54, 30, 6, 1),
(55, 31, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `image1` varchar(255) NOT NULL,
  `image2` varchar(255) NOT NULL,
  `image3` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `group` varchar(255) NOT NULL,
  `imagePath` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `stock` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `image1`, `image2`, `image3`, `description`, `group`, `imagePath`, `brand`, `title`, `price`, `stock`, `createdAt`, `updatedAt`) VALUES
(1, '/images/img/products/f2.jpg', '/images/img/products/f3.jpg', '/images/img/products/f4.jpg', 'Heavyweight Blank Graphic Plain Custom T Shirt Customized Drop Shoulder T-Shirts Vintage Cotton Tshirts Bulk T-Shirt, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. La vel, aliquet nec, vulputate ', 'featuredProducts', '/images/img/products/f1.jpg', 'Zara', 'Modern Style Shirt', 75, 0, '2023-03-15 15:53:27', '2023-03-15 15:53:27'),
(2, '/images/img/products/f1.jpg', '/images/img/products/f3.jpg', '/images/img/products/f4.jpg', 'Heavyweight Blank Graphic Plain Custom T Shirt Customized Drop Shoulder T-Shirts Vintage Cotton Tshirts Bulk T-Shirt, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. La vel, aliquet nec, vulputate ', 'featuredProducts', '/images/img/products/f2.jpg', 'Tommy', 'Men Beach Shirt', 75, 10, '2023-03-15 15:53:27', '2023-03-15 15:53:27'),
(3, '/images/img/products/f2.jpg', '/images/img/products/f1.jpg', '/images/img/products/f4.jpg', 'Heavyweight Blank Graphic Plain Custom T Shirt Customized Drop Shoulder T-Shirts Vintage Cotton Tshirts Bulk T-Shirt, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. La vel, aliquet nec, vulputate ', 'featuredProducts', '/images/img/products/f3.jpg', 'Zara', 'Light Modern Shirt', 75, 300, '2023-03-15 15:53:27', '2023-03-15 15:53:27'),
(4, '/images/img/products/f2.jpg', '/images/img/products/f3.jpg', '/images/img/products/f1.jpg', 'Heavyweight Blank Graphic Plain Custom T Shirt Customized Drop Shoulder T-Shirts Vintage Cotton Tshirts Bulk T-Shirt, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. La vel, aliquet nec, vulputate ', 'featuredProducts', '/images/img/products/f4.jpg', 'Versace', 'Modern Men Shirt', 75, 300, '2023-03-15 15:53:27', '2023-03-15 15:53:27'),
(5, '/images/img/products/f2.jpg', '/images/img/products/f3.jpg', '/images/img/products/f4.jpg', 'Heavyweight Blank Graphic Plain Custom T Shirt Customized Drop Shoulder T-Shirts Vintage Cotton Tshirts Bulk T-Shirt, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. La vel, aliquet nec, vulputate ', 'featuredProducts', '/images/img/products/f5.jpg', 'Koton', 'Simple Style Shirt', 75, 300, '2023-03-15 15:53:27', '2023-03-15 15:53:27'),
(6, '/images/img/products/f2.jpg', '/images/img/products/f3.jpg', '/images/img/products/f4.jpg', 'Heavyweight Blank Graphic Plain Custom T Shirt Customized Drop Shoulder T-Shirts Vintage Cotton Tshirts Bulk T-Shirt, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. La vel, aliquet nec, vulputate ', 'featuredProducts', '/images/img/products/f6.jpg', 'Nike', 'Street Style Shirt', 104, 300, '2023-03-15 15:53:27', '2023-03-15 15:53:27'),
(7, '/images/img/products/f2.jpg', '/images/img/products/f3.jpg', '/images/img/products/f4.jpg', 'Heavyweight Blank Graphic Plain Custom T Shirt Customized Drop Shoulder T-Shirts Vintage Cotton Tshirts Bulk T-Shirt, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. La vel, aliquet nec, vulputate ', 'featuredProducts', '/images/img/products/f7.jpg', 'Reebok', 'Men Chill Pants', 25, 300, '2023-03-15 15:53:27', '2023-03-15 15:53:27'),
(8, '/images/img/products/f2.jpg', '/images/img/products/f3.jpg', '/images/img/products/f4.jpg', 'Heavyweight Blank Graphic Plain Custom T Shirt Customized Drop Shoulder T-Shirts Vintage Cotton Tshirts Bulk T-Shirt, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. La vel, aliquet nec, vulputate ', 'featuredProducts', '/images/img/products/f8.jpg', 'Adidas', 'Women Chill Shirt', 35, 300, '2023-03-15 15:53:27', '2023-03-15 15:53:27'),
(9, '/images/img/products/n2.jpg', '/images/img/products/n3.jpg', '/images/img/products/n4.jpg', 'Heavyweight Blank Graphic Plain Custom T Shirt Customized Drop Shoulder T-Shirts Vintage Cotton Tshirts Bulk T-Shirt, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. La vel, aliquet nec, vulputate ', 'newArrivals', '/images/img/products/n1.jpg', 'Zara', 'Formal Men Shirt', 85, 300, '2023-03-15 15:53:27', '2023-03-15 15:53:27'),
(10, '/images/img/products/n1.jpg', '/images/img/products/n3.jpg', '/images/img/products/n4.jpg', 'Heavyweight Blank Graphic Plain Custom T Shirt Customized Drop Shoulder T-Shirts Vintage Cotton Tshirts Bulk T-Shirt, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. La vel, aliquet nec, vulputate ', 'newArrivals', '/images/img/products/n2.jpg', 'Zara', 'Formal Modern Shirt', 95, 300, '2023-03-15 15:53:27', '2023-03-15 15:53:27'),
(11, '/images/img/products/n2.jpg', '/images/img/products/n1.jpg', '/images/img/products/n4.jpg', 'Heavyweight Blank Graphic Plain Custom T Shirt Customized Drop Shoulder T-Shirts Vintage Cotton Tshirts Bulk T-Shirt, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. La vel, aliquet nec, vulputate ', 'newArrivals', '/images/img/products/n3.jpg', 'George', 'Simple Formal Shirt', 95, 300, '2023-03-15 15:53:27', '2023-03-15 15:53:27'),
(12, '/images/img/products/n2.jpg', '/images/img/products/n3.jpg', '/images/img/products/n1.jpg', 'Heavyweight Blank Graphic Plain Custom T Shirt Customized Drop Shoulder T-Shirts Vintage Cotton Tshirts Bulk T-Shirt, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. La vel, aliquet nec, vulputate ', 'newArrivals', '/images/img/products/n4.jpg', 'Diesel', 'Formal Half Sleeve', 65, 300, '2023-03-15 15:53:27', '2023-03-15 15:53:27'),
(13, '/images/img/products/n2.jpg', '/images/img/products/n3.jpg', '/images/img/products/n4.jpg', 'Heavyweight Blank Graphic Plain Custom T Shirt Customized Drop Shoulder T-Shirts Vintage Cotton Tshirts Bulk T-Shirt, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. La vel, aliquet nec, vulputate ', 'newArrivals', '/images/img/products/n5.jpg', 'Nike', 'Street Oversize Shirt', 95, 300, '2023-03-15 15:53:27', '2023-03-15 15:53:27'),
(14, '/images/img/products/n2.jpg', '/images/img/products/n3.jpg', '/images/img/products/n4.jpg', 'Heavyweight Blank Graphic Plain Custom T Shirt Customized Drop Shoulder T-Shirts Vintage Cotton Tshirts Bulk T-Shirt, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. La vel, aliquet nec, vulputate ', 'newArrivals', '/images/img/products/n6.jpg', 'Zara', 'Formal Business Pants', 105, 300, '2023-03-15 15:53:27', '2023-03-15 15:53:27'),
(15, '/images/img/products/n2.jpg', '/images/img/products/n3.jpg', '/images/img/products/n4.jpg', 'Heavyweight Blank Graphic Plain Custom T Shirt Customized Drop Shoulder T-Shirts Vintage Cotton Tshirts Bulk T-Shirt, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. La vel, aliquet nec, vulputate ', 'newArrivals', '/images/img/products/n7.jpg', 'George', 'Modern Smooth Shirt', 150, 300, '2023-03-15 15:53:27', '2023-03-15 15:53:27'),
(16, '/images/img/products/n2.jpg', '/images/img/products/n3.jpg', '/images/img/products/n4.jpg', 'Heavyweight Blank Graphic Plain Custom T Shirt Customized Drop Shoulder T-Shirts Vintage Cotton Tshirts Bulk T-Shirt, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. La vel, aliquet nec, vulputate ', 'newArrivals', '/images/img/products/n8.jpg', 'Sanmar', 'Casual Comfy Shirt', 15, 300, '2023-03-15 15:53:27', '2023-03-15 15:53:27');

-- --------------------------------------------------------

--
-- Table structure for table `supervisors`
--

CREATE TABLE `supervisors` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supervisors`
--

INSERT INTO `supervisors` (`id`, `full_name`, `login`, `password`) VALUES
(1, 'John Smith', 'johnsmith', 'password123'),
(2, 'Jane Smith', 'janesmith', 'password456'),
(3, 'Bob Johnson', 'bobjohnson', 'password789'),
(4, 'Alice Johnson', 'alicejohnson', 'password321');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(9, 'Ace', 'ljadid@gmail.com', '$2b$10$WKzlSwU6ClBeOafJ76/SKO5uEQO45UGSE/BPi3bs4LI/FhC3ovS1e', '2023-03-18 16:50:14', '2023-04-27 18:43:40'),
(64, 'Ace', 'ace@gmail.com', '$2b$10$lg4PnrNT03GwH/1L75vNneGb3IzNDb.GFB63BW62XtWUjVECBMQfq', '2023-04-20 23:02:32', '2023-04-27 18:39:42'),
(65, 'ouassim', 'ouassimnadi@gmail.com', '$2b$10$GPw5XX5v7BT30R/EmuYn9uKh6WlYvM/jvYA07mO0PzrevpTWfS/Ke', '2023-04-27 22:34:52', '2023-04-27 22:36:22'),
(66, 'ana', 'ana@ana.anaa', '$2b$10$iwVa0de90z0fEelwyREb..3ebXDZ4GCczXytZET32Qe62zrWFRj4y', '2023-05-01 17:41:38', '2023-05-07 19:57:23'),
(67, 'marouane', 'maro@maro.com', '$2b$10$1yYDtzzWTG4Vp0aWuLUZWe0o.pq38q7wj4Ybpby4hbkxKQKh9Q2x.', '2023-05-12 08:47:06', '2023-05-12 08:47:06'),
(68, 'ana', 'ana@gmail.com', '$2b$10$uPs7S564MSwQOFh/znPwjO0hgoRA65KBftcXzP3gxzJxEFUaBoISq', '2023-05-14 15:46:32', '2023-05-14 15:46:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `emaillists`
--
ALTER TABLE `emaillists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supervisor_id` (`supervisor_id`);

--
-- Indexes for table `favourite_products`
--
ALTER TABLE `favourite_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`user_id`),
  ADD KEY `fk_teads_employee` (`employee_id`);

--
-- Indexes for table `lead_products`
--
ALTER TABLE `lead_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lead_id` (`lead_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supervisors`
--
ALTER TABLE `supervisors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `emaillists`
--
ALTER TABLE `emaillists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `favourite_products`
--
ALTER TABLE `favourite_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `lead_products`
--
ALTER TABLE `lead_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `supervisors`
--
ALTER TABLE `supervisors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`supervisor_id`) REFERENCES `supervisors` (`id`);

--
-- Constraints for table `favourite_products`
--
ALTER TABLE `favourite_products`
  ADD CONSTRAINT `favourite_products_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favourite_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `leads`
--
ALTER TABLE `leads`
  ADD CONSTRAINT `fk_teads_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `lead_products`
--
ALTER TABLE `lead_products`
  ADD CONSTRAINT `lead_products_ibfk_1` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`),
  ADD CONSTRAINT `lead_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
