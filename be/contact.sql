-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 01, 2023 lúc 06:04 AM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `menureact`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `mota` text NOT NULL,
  `diachi` text NOT NULL,
  `sdt` text NOT NULL,
  `gmail` text NOT NULL,
  `url` text NOT NULL,
  `map` text NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `contact`
--

INSERT INTO `contact` (`id`, `mota`, `diachi`, `sdt`, `gmail`, `url`, `map`, `status`, `createdAt`, `updatedAt`) VALUES
(1, '<h2 class=\"my-3 mb-lg-4\">Visit one of our agency locations or contact us today.</h2>\r\n<div class=\"contact-page__des\">\r\n<div class=\"mb-3\"><a href=\"https://ap-sharon.myshopify.com/\"><span style=\"color: rgb(252, 33, 238);\">Apollo themes</span></a>&nbsp;features beautifully sectioned layout that allows you to showcase featured items for each category on the homepage. It comes with many different homepage layouts, so you can choose any suitable homepage for you store.</div>\r\n</div>', '123 Sky Tower, West 21th Street, Suite 721, NY', '0368438179', 'demo@demo.com', 'www.abc.com', 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15677.910304719593!2d106.6343342!3d10.7746873!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ea144839ef1%3A0x798819bdcd0522b0!2zVHLGsOG7nW5nIENhbyDEkOG6s25nIEPDtG5nIE5naOG7hyBUaMO0bmcgVGluIFRwLkjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1685587098524!5m2!1svi!2s', 1, '2023-06-01 02:39:16', '2023-06-01 02:42:04'),
(3, '<p>&aacute;d</p>', 'ád', '212', 'ád', '', 'ád', 0, '2023-06-01 02:49:50', '2023-06-01 02:49:50');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
