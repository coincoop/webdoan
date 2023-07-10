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
-- Cấu trúc bảng cho bảng `home`
--

CREATE TABLE `home` (
  `id` int(255) NOT NULL,
  `ten` text NOT NULL,
  `imghead` longtext NOT NULL,
  `imgfoot` longtext NOT NULL,
  `sdt` text DEFAULT NULL,
  `diachi` text DEFAULT NULL,
  `gmail` text DEFAULT NULL,
  `img1` text NOT NULL,
  `img2` text NOT NULL,
  `img3` text NOT NULL,
  `mota` text DEFAULT NULL,
  `motaFooter` text NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `home`
--

INSERT INTO `home` (`id`, `ten`, `imghead`, `imgfoot`, `sdt`, `diachi`, `gmail`, `img1`, `img2`, `img3`, `mota`, `motaFooter`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Công ty trách nhiệm hữu hạn xây dựng Phú Cường', 'stationery.png', 'stationery.png', '0368438179', '12 Trịnh Đình Thảo, Hoà Thanh, Tân Phú, Tp.HCM', 'vanphongpham12@gmail.com', 'van-phong-pham-247.jpg', 'Shop10k_Banner-web-Vpp_210629-min__1_.jpg', 'banner.jpg', '<h2><strong>Văn Ph&ograve;ng Phẩm tại AIO c&oacute; ch&iacute;nh s&aacute;ch Chiết Khấu Cực Cao</strong></h2>\r\n<h4><strong><span class=\"elementor-icon-list-text\">Đơn &gt; 1 Triệu đến dưới 2 Triệu chiết khấu 7% gi&aacute; trước VAT (Ngoại Trừ giấy in c&aacute;c loại)</span></strong></h4>\r\n<h4><strong><span class=\"elementor-icon-list-text\">Đơn &gt; 2 Triệu đến dưới 3 Triệu chiết khấu 8% gi&aacute; trước VAT (Ngoại Trừ giấy in c&aacute;c loại)</span></strong></h4>\r\n<h4><strong><span class=\"elementor-icon-list-text\">Đơn &gt; 3 Triệu đến dưới 5 Triệu chiết khấu 10% gi&aacute; trước VAT (Ngoại Trừ giấy in c&aacute;c loại)</span></strong></h4>\r\n<h4><strong><span class=\"elementor-icon-list-text\">Đơn &gt; 5 Triệu đến dưới 10 Triệu chiết khấu 12% gi&aacute; trước VAT (Ngoại Trừ giấy in c&aacute;c loại)</span></strong></h4>\r\n<h3><strong>Đặc Biệt:&nbsp;Giấy In từ 5 -&gt; dưới 10 th&ugrave;ng giảm 5.000/Th&ugrave;ng &ndash; giấy từ 10 th&ugrave;ng trở l&ecirc;n giảm 10.000/Th&ugrave;ng</strong><a href=\"https://bom.so/bxxQFA\" rel=\"nofollow\"><img class=\"aligncenter lazyloaded\" style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://bizweb.dktcdn.net/100/111/730/files/untitled-1-0812be15-a444-45da-baff-6590159f9ac4.png?v=1623747907683\" alt=\"\" width=\"400\" height=\"100\" data-src=\"https://bizweb.dktcdn.net/100/111/730/files/untitled-1-0812be15-a444-45da-baff-6590159f9ac4.png?v=1623747907683\" data-thumb=\"original\"></a></h3>\r\n<h3><a href=\"https://bom.so/bxxQFA\"><strong>VUI L&Ograve;NG LI&Ecirc;N HỆ HOTILINE : 0981.654.572 (MS.Nhi&ecirc;n) Để Được Hỗ Trợ Nhanh Hơn</strong></a></h3>', '<p>&copy; 2018. C&ocirc;ng ty cổ phần Thế Giới Di Động. GPDKKD: 0303217354 do sở KH &amp; ĐT TP.HCM cấp ng&agrave;y 02/01/2007. GPMXH: 21/GP-BTTTT do Bộ Th&ocirc;ng Tin v&agrave; Truyền Th&ocirc;ng cấp ng&agrave;y 11/01/2021.<br>Địa chỉ: 128 Trần Quang Khải, P. T&acirc;n Định, Q.1, TP.Hồ Ch&iacute; Minh. Điện thoại: 028 38125960. Email: cskh@thegioididong.com. Chịu tr&aacute;ch nhiệm nội dung: Huỳnh Văn Tốt.&nbsp;<a href=\"https://www.dienmayxanh.com/thoa-thuan-su-dung-trang-mxh\" rel=\"nofollow\">Xem ch&iacute;nh s&aacute;ch sử dụng</a></p>', 1, '2023-05-14 04:00:00', '2023-06-01 01:58:51'),
(4, '', 'blog.png', 'contact.png', '113', 'ádas', 'ád', 'banner-tet.jpg', '1920x868.jpg', 'bao-quan-thuc-pham-Tet.png', NULL, '', 0, '2023-05-22 16:24:29', '2023-05-23 03:07:52'),
(5, '', '2.png', 'help.png', '1134', 'âsasas', 'âsa', '5c41fadd01dcdc8285cd4.jpg', '3.png', '316256499_121114944139949_4939628830480469284_n.jpg', NULL, '', 0, '2023-05-23 02:36:17', '2023-05-23 03:21:49');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `home`
--
ALTER TABLE `home`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `home`
--
ALTER TABLE `home`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
