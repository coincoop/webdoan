-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 09, 2023 lúc 01:32 PM
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
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `makh` int(11) NOT NULL,
  `masp` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `thanhtien` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`makh`, `masp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Cấu trúc bảng cho bảng `hoadon`
--
DROP TABLE IF EXISTS `hoadon`;
CREATE TABLE `hoadon` (
  `id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `menus`
--
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `menus`
--

INSERT INTO `menus` (`id`, `name`, `parent_id`, `url`, `createdAt`, `updatedAt`) VALUES
(1, 'Trang chủ', NULL, '/', NULL, NULL),
(2, 'Sản phẩm', NULL, 'product', NULL, NULL),
(3, 'Giúp đỡ', NULL, '#', NULL, NULL),
(4, 'Blog', NULL, 'blog', NULL, NULL),
(5, 'Liên hệ', NULL, 'lienhe', NULL, NULL),
(6, 'Giấy in', 2, 'giayin', NULL, NULL),
(7, 'Bút, mực', 2, 'but-muc', NULL, NULL),
(8, 'Giúp đỡ 1', 3, 'giupdo1', NULL, NULL),
(9, 'Giúp đỡ 2', 3, 'giupdo2', NULL, NULL),
(10, 'Giấy in photo', 6, 'giayinphoto', NULL, NULL),
(11, 'Giấy Note', 6, 'giaynote', NULL, '2023-04-29 03:59:24'),
(12, 'Bút bi', 7, 'butbi', NULL, '2023-04-29 04:02:40'),
(19, 'Mực con dấu - bút lông', 7, 'muc', '2023-04-27 07:09:19', '2023-04-29 04:05:12'),
(20, 'Giấy Double A', 10, 'giaydoublea', '2023-04-29 04:08:20', '2023-04-29 04:08:20'),
(21, 'Giấy Excel Indo', 10, 'giayexcelindo', '2023-04-29 04:10:19', '2023-04-29 04:10:19'),
(22, 'Giấy Note UNC + DOUBLE A', 11, 'giay-note-unc-double-a', '2023-04-29 04:13:26', '2023-04-29 04:13:26'),
(23, 'Giấy Note Pronoti', 11, 'giay-note-pronoti', '2023-04-29 04:13:49', '2023-04-29 04:14:31'),
(24, 'Bút Bi Thiên Long', 12, 'but-bi-thien-long', '2023-04-29 04:16:59', '2023-04-29 04:16:59'),
(25, 'Bút Bi Double A - Quality', 12, 'but-bi-double-a-quality', '2023-04-29 04:19:06', '2023-04-29 04:19:06'),
(26, 'Mực con dấu', 19, 'muc-con-dau', '2023-04-29 04:19:58', '2023-04-29 04:19:58'),
(27, 'Mực bút lông', 19, 'muc-but-long', '2023-04-29 04:20:36', '2023-04-29 04:20:36');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhacungcap`
--
DROP TABLE IF EXISTS `nhacungcap`;
CREATE TABLE `nhacungcap` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phanloai`
--
DROP TABLE IF EXISTS `phanloai`;
CREATE TABLE `phanloai` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `makh` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `tenkh` varchar(225) CHARACTER SET utf8 NOT NULL ,
  `username` varchar(25) NOT NULL,
  `matkhau` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `diachi` varchar(225) CHARACTER SET utf8 NOT NULL,
  `sodienthoai` varchar(12) NOT NULL,
  `vaitro` int(1) DEFAULT 0 NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanphams`
--
DROP TABLE IF EXISTS `sanphams`;
CREATE TABLE `sanphams` (
  `id` int(11) NOT NULL,
  `tensp` varchar(255) NOT NULL,
  `mota` varchar(255) CHARACTER SET utf8 NOT NULL,
  `mota_chinh` varchar(10000) DEFAULT NULL,
  `dongia` decimal(10,0) DEFAULT NULL,
  `giacu` decimal(10,0) DEFAULT NULL,
  `img` varchar(255) NOT NULL,
  `img_con` varchar(255) DEFAULT NULL,
  `id_nhacungcap` int(11) NOT NULL,
  `id_loailon` int(11) NOT NULL,
  `id_loai` int(11) NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `donvitinh` varchar(255) DEFAULT NULL,
  `dinhluong` varchar(255) DEFAULT NULL,
  `chatlieu` varchar(255) DEFAULT NULL,
  `donggoi` varchar(255) DEFAULT NULL,
  `khogiay` varchar(255) DEFAULT NULL,
  `xuatxu` varchar(255) DEFAULT NULL,
  `kichthuoc` varchar(255) DEFAULT NULL,
  `thuonghieu` varchar(255) DEFAULT NULL,
  `thetich` varchar(255) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `sanphams`
--

INSERT INTO `sanphams` (`id`, `tensp`, `mota`, `mota_chinh`, `dongia`, `giacu`, `img`, `img_con`, `id_nhacungcap`, `id_loailon`, `id_loai`, `color`, `donvitinh`, `dinhluong`, `chatlieu`, `donggoi`, `khogiay`, `xuatxu`, `kichthuoc`, `thuonghieu`, `thetich`, `url`, `createdAt`, `updatedAt`) VALUES
(1, 'Giấy In A3 80gsm Double A', 'Double A là một loại giấy cao cấp được biết đến với chất lượng cao, kiểu dáng vượt trội và thân thiện với môi trường.', NULL, '168000', NULL, 'giay-in-a3-80gsm-double-a.png', 'giay-in-a3-80gsm-double-a.png,ghi-note-5-mau-nhua-double-a.png,giay-ghi-chu-vang-pronoti-kt-3-3.png,giay-in-a3-70gsm-double-a.png', 1, 10, 20, NULL, 'Ram', NULL, NULL, '5 Ram/Thùng', 'A3', 'Thái Lan', NULL, 'Double A', NULL, 'giay-in-a3-80gsm-double-a', NULL, NULL),
(2, 'Giấy In A3 70gsm Double A', 'Double A là một loại giấy cao cấp được biết đến với chất lượng cao, kiểu dáng vượt trội và thân thiện với môi trường.', NULL, '147000', NULL, 'giay-in-a3-70gsm-double-a.png', 'giay-in-a3-70gsm-double-a.png', 1, 10, 20, NULL, 'Ram', NULL, NULL, '5 Ram/Thùng', 'A3', 'Thái Lan', NULL, 'Double A', NULL, 'giay-in-a3-70gsm-double-a', NULL, NULL),
(3, 'Giấy In A3 80gsm - Excel', 'Mặt giấy in Excel láng và rất mịn giấy in không bị nhăn và lem mực.\n\nThích hợp cho các nhân viên văn phòng. Excel là loại giấy đẹp, chất lượng cao với giá thành thấp.\n\nChuyên dùng cho máy photocopy, máy in mực, in laser, máy fax, in off-set.', NULL, '118000', NULL, 'giay-in-a3-80gsm-excel.png', 'giay-in-a3-80gsm-excel.png', 1, 10, 21, NULL, 'Ream', '80gsm', NULL, NULL, 'A3', 'Indonesia', NULL, 'Excel', NULL, 'giay-in-a3-80gsm-excel', NULL, NULL),
(4, 'Giấy In A3 70gsm - Excel', 'Mặt giấy in Excel láng và rất mịn giấy in không bị nhăn và lem mực.\r\n\r\nThích hợp cho các nhân viên văn phòng. Excel là loại giấy đẹp, chất lượng cao với giá thành thấp.\r\n\r\nChuyên dùng cho máy photocopy, máy in mực, in laser, máy fax, in off-set.', NULL, '99000', NULL, 'giay-in-excel-a3-70gsm.png', 'giay-in-excel-a3-70gsm.png', 1, 10, 21, NULL, 'Ream', '70gsm', NULL, NULL, 'A3', 'Indonesia', NULL, 'Excel', NULL, 'giay-in-a3-70gsm-excel', NULL, NULL),
(5, 'Ghi Note 5 Màu Nhựa- Double A', 'Giấy bắt mực tốt, cho mực nhanh khô, không lem nhòe, không làm mực bị in hằn sang mặt sau. Người dùng có thể dễ dàng mang theo sản phẩm bên mình, sử dụng mọi lúc mọi nơi, vô cùng tiện lợi. Giấy màu trơn, không hoa văn, có nhiều màu sắc thanh nhã, tươi sán', NULL, '9500', NULL, 'ghi-note-5-mau-nhua-double-a.png', 'ghi-note-5-mau-nhua-double-a.png', 2, 11, 22, '5 màu', 'Xấp', NULL, 'Nhựa', '100 tờ /xấp', NULL, NULL, '42mm x 12mm', 'Double A', NULL, 'ghi-note-5-mau-nhua-double-a', NULL, NULL),
(6, 'Note UNC KT 3*3', 'Đặc tính của giấy note là giúp các bạn quản lý và tổ chức kế hoạch trong thời gian dài hạn, nhắc nhở bạn những việc cần làm. Ngay cả trong những lúc bận rộn nhất bạn cũng có thể ghi chú 1 cách dễ dàng, mọi nơi.', NULL, '6500', NULL, 'note-unc-kt-3-3.png', 'note-unc-kt-3-3.png\n', 2, 11, 22, NULL, 'Xấp (100 tờ/xấp)', NULL, NULL, '12 xấp / lốc', NULL, NULL, NULL, 'Unicorn', NULL, 'note-unc-kt-3-3', NULL, NULL),
(8, 'Note Pronoti 5 Màu - Giấy', 'Pronoti là nhãn hiệu nổi tiếng về giấy note, một trong những sản phẩm đó là Giấy note 5 màu giấy Pronoti , sản xuất theo công nghệ sản xuất giấy đến từ Đài Loan.', NULL, '9500', NULL, 'note-pronoti-5-mau-giay.png', 'note-pronoti-5-mau-giay.png', 1, 11, 23, '5 màu', 'Xấp', NULL, NULL, '36 xấp/hộp', NULL, NULL, NULL, 'Pronoti', NULL, 'note-pronoti-5-mau-giay', NULL, NULL),
(9, 'Note Pronoti KT 3*4 Cm', 'Giấy màu vàng nổi bật, đẹp mắt. Phục vụ tốt nhu cầu làm việc, chất keo bền lâu, khó bong tróc. Giấy note sử dụng đa dạng ở nhiều nơi, nhiều công việc, ngành nghề khác nhau.', NULL, '6500', NULL, 'giay-ghi-chu-vang-pronoti-kt-3-3.png', 'giay-ghi-chu-vang-pronoti-kt-3-3.png', 1, 11, 23, NULL, 'Xấp', NULL, NULL, NULL, NULL, 'Đài Loan', '7,6cm*7,6cm', 'Pronoti', NULL, 'giay-ghi-chu-vang-pronoti-kt-3-3', NULL, NULL),
(85, 'ádasd', 'asd', '<p>&acirc;sassd<a href=\"https://www.youtube.com/watch?v=zubxCn9MekQ&amp;list=RDzubxCn9MekQ&amp;start_radio=1&amp;ab_channel=DuyB\">fsdfsdf</a></p>', NULL, NULL, '1-8.jpg', '1.3.jpg,1.3.jpg,1.2.jpg,1-3.jpg,1-9.jpg', 1, 1, 1, 'a', 'a', 'a', 'â', 'a', 'a', 'a', 'a', 'a', 'a', 'a', '2023-05-08 09:49:32', '2023-05-08 15:27:18');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `nhacungcap`
--
ALTER TABLE `nhacungcap`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `phanloai`
--
ALTER TABLE `phanloai`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sanphams`
--
ALTER TABLE `sanphams`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `nhacungcap`
--
ALTER TABLE `nhacungcap`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `phanloai`
--
ALTER TABLE `phanloai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `sanphams`
--
ALTER TABLE `sanphams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
