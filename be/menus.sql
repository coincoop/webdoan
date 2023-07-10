-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 01, 2023 lúc 06:05 AM
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
-- Cấu trúc bảng cho bảng `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `img` longtext DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `menus`
--

INSERT INTO `menus` (`id`, `name`, `parent_id`, `img`, `url`, `createdAt`, `updatedAt`) VALUES
(1, 'Trang chủ', 0, 'home.png', '#', NULL, '2023-05-15 01:30:28'),
(2, 'Sản phẩm', 0, 'product.png', 'product', NULL, '2023-05-11 13:42:42'),
(3, 'Dịch vụ', 0, 'customer-service.png', '#', NULL, '2023-05-19 01:36:36'),
(4, 'Tin tức', 0, 'blog.png', 'blog', NULL, '2023-05-11 13:45:10'),
(5, 'Liên hệ', 0, 'contact.png', 'lienhe', NULL, '2023-05-11 13:45:19'),
(6, 'Giấy in', 2, 'printer.png', '#', NULL, '2023-05-19 01:40:30'),
(7, 'Bút, mực', 2, 'pen.png', '#', NULL, '2023-05-19 01:42:19'),
(8, 'Hướng dẫn thanh toán', 3, '', 'giup-do-1', '2023-05-11 06:00:20', '2023-05-11 06:00:20'),
(9, 'Hướng dẫn trả góp', 3, '', 'giupdo2', NULL, NULL),
(10, 'Giấy in photo', 6, '', 'giayinphoto', NULL, NULL),
(11, 'Giấy Note', 6, '', 'giaynote', NULL, '2023-04-29 03:59:24'),
(12, 'Bút bi', 7, '', 'butbi', NULL, '2023-04-29 04:02:40'),
(19, 'Mực con dấu - bút lông', 7, '', 'muc', '2023-04-27 07:09:19', '2023-04-29 04:05:12'),
(20, 'Giấy Double A', 10, '', 'giaydoublea', '2023-04-29 04:08:20', '2023-04-29 04:08:20'),
(21, 'Giấy Excel Indo', 10, '', 'giayexcelindo', '2023-04-29 04:10:19', '2023-04-29 04:10:19'),
(22, 'Giấy Note UNC + DOUBLE A', 11, '', 'giay-note-unc-double-a', '2023-04-29 04:13:26', '2023-04-29 04:13:26'),
(23, 'Giấy Note Pronoti', 11, '', 'giay-note-pronoti', '2023-04-29 04:13:49', '2023-04-29 04:14:31'),
(24, 'Bút Bi Thiên Long', 12, '', 'but-bi-thien-long', '2023-04-29 04:16:59', '2023-04-29 04:16:59'),
(25, 'Bút Bi Double A - Quality', 12, '', 'but-bi-double-a-quality', '2023-04-29 04:19:06', '2023-04-29 04:19:06'),
(26, 'Mực con dấu', 19, '', 'muc-con-dau', '2023-04-29 04:19:58', '2023-04-29 04:19:58'),
(27, 'Mực bút lông', 19, '', 'muc-but-long', '2023-04-29 04:20:36', '2023-04-29 04:20:36'),
(35, 'Giấy in liên tục - in bill', 6, '', 'giay-in-lien-tuc-in-bill', '2023-05-19 01:53:51', '2023-05-19 01:53:51'),
(36, 'Giấy Scan Gateway', 35, NULL, 'giay-scan-gateway', '2023-05-19 01:59:10', '2023-05-19 01:59:50'),
(37, 'Giấy Fax Nhiệt', 35, NULL, 'giay-fax-nhiet', '2023-05-19 02:00:48', '2023-05-19 02:00:48'),
(38, 'Decal - In Ảnh - Bìa Màu', 6, NULL, 'decal-in-anh-bia-mau', '2023-05-19 02:01:33', '2023-05-19 02:01:33'),
(39, 'Giấy In Ảnh EPSON', 38, NULL, 'giay-in-anh-epson', '2023-05-19 02:02:23', '2023-05-19 02:02:23'),
(40, 'Giấy In Màu EPSON', 38, NULL, 'giay-in-mau-epson', '2023-05-19 02:02:46', '2023-05-19 02:02:46'),
(41, 'Giấy Supreme', 10, NULL, 'giay-supreme', '2023-05-19 02:04:40', '2023-05-19 02:04:40');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
