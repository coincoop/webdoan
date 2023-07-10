import React from "react";
import { useState } from "react";
import "../css/login.css";
import { API_URL } from "../config";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { registerUser } from '../redux/apiRequest.js';
import { registerFailed, registerStart ,registerSuccess,} from "../redux/slice";
import axios from "axios";

export default function Register() {
    const [tenkh, setTenkh] = useState('');
    const [username, setUsername] = useState('');
    const [matkhau, setMatkhau] = useState('');
    const [email, setEmail] = useState('');
    const [diachi, setDiachi] = useState('');
    const [sodienthoai, setSodienthoai] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra tất cả các tham số trước khi submit
        if (!tenkh || !email || !username || !matkhau || !diachi || !sodienthoai) {
            setErrorMessage("Vui lòng điền đầy đủ thông tin");
            return;
        }

        const newUser = {
            tenkh: tenkh,
            username: username,
            matkhau: matkhau,
            email: email.toLowerCase(),
            diachi: diachi,
            sodienthoai: sodienthoai,
            vaitro: 0
        };

        try {
            await axios.post(`${API_URL}account/register`, newUser);
            dispatch(registerSuccess());
            navigate('/account/login');
        } catch (error) {

            if (error.response) {
                // Xử lý lỗi từ phía server (response có status code)
                if (error.response.status === 400) {
                    // Sai mật khẩu
                    setErrorMessage("Username đã tồn tại");
                } else if (error.response.status === 401) {
                    // Sai tên đăng nhập
                    setErrorMessage("Email đã tồn tại");
                } else {
                    // Xử lý các lỗi khác từ phía server
                    dispatch(registerFailed(("Đã có lỗi xảy ra")));
                }
            } else {
                // Xử lý lỗi không có response từ phía server
                dispatch(registerFailed(("Đã có lỗi xảy ra")));
            }
        }
    };

    return (
        <div className="box-login">
            <nav
                class="breadcrumbs-style_1 breadcrumb g-breadcrumb lazyload text-center"
                role="navigation"
                aria-label="breadcrumbs"
            >
                <div class="container-fluid"></div>
                <div class="container-fluid">
                    <a className="linkhome" href="/" title="Home">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fal"
                            data-icon="home"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                            class="icon icon-home"
                        >
                            <path
                                fill="currentColor"
                                d="M541 229.16l-61-49.83v-77.4a6 6 0 0 0-6-6h-20a6 6 0 0 0-6 6v51.33L308.19 39.14a32.16 32.16 0 0 0-40.38 0L35 229.16a8 8 0 0 0-1.16 11.24l10.1 12.41a8 8 0 0 0 11.2 1.19L96 220.62v243a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-128l64 .3V464a16 16 0 0 0 16 16l128-.33a16 16 0 0 0 16-16V220.62L520.86 254a8 8 0 0 0 11.25-1.16l10.1-12.41a8 8 0 0 0-1.21-11.27zm-93.11 218.59h.1l-96 .3V319.88a16.05 16.05 0 0 0-15.95-16l-96-.27a16 16 0 0 0-16.05 16v128.14H128V194.51L288 63.94l160 130.57z"
                                class=""
                            ></path>
                        </svg>{" "}
                        Trang chủ
                    </a>

                    <span aria-hidden="true" className="iconhome">
                        ›
                    </span>
                    <span>Tạo tài khoản</span>
                </div>
            </nav>
            <main
                id="MainContent"
                class="content-for-layout focus-none"
                role="main"
                tabindex="-1"
            >
                <link
                    href="//cdn.shopify.com/s/files/1/0642/1161/5996/t/2/assets/customer.css?v=64096048890753148901651743151"
                    rel="stylesheet"
                    type="text/css"
                    media="all"
                />
                <div class="customer login">
                    <h1 id="register" tabindex="-1">
                        Đăng ký
                    </h1>
                    <div>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <input type="hidden" name="form_type" value="customer_register" />
                            <input type="hidden" name="utf8" value="✓" />
                            <div class="field">
                                <input type="text"
                                    autocomplete="tenkh"
                                    autocorrect="off"
                                    autocapitalize="off"
                                    placeholder="Tenkh" onChange={(e) => setTenkh(e.target.value)}
                                />
                                <label for="">Họ và Tên</label>
                            </div>
                            <div class="field">
                                <input type="text"
                                    autocomplete="tendn"
                                    autocorrect="off"
                                    autocapitalize="off"
                                    placeholder="Tendn" onChange={(e) => setUsername(e.target.value)}
                                />
                                <label for="">Tên đăng nhập</label>
                            </div>
                            <div class="field">
                                <input type="password"
                                    autocomplete="matkhau"
                                    autocorrect="off"
                                    autocapitalize="off"
                                    placeholder="Matkhau" onChange={(e) => setMatkhau(e.target.value)}
                                />
                                <label for="">Mật khẩu</label>
                            </div>
                            <div class="field">
                                <input type="email"
                                    autocomplete="email"
                                    autocorrect="off"
                                    autocapitalize="off"
                                    placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                                />
                                <label for="">Email</label>
                            </div>
                            <div class="field">
                                <input type="text"
                                    autocomplete="diachi"
                                    autocorrect="off"
                                    autocapitalize="off"
                                    placeholder="Diachi" onChange={(e) => setDiachi(e.target.value)}
                                />
                                <label for="">Địa chỉ</label>
                            </div>
                            <div class="field">
                                <input type="text"
                                    autocomplete="sdt"
                                    autocorrect="off"
                                    autocapitalize="off"
                                    placeholder="Sdt" onChange={(e) => setSodienthoai(e.target.value)}
                                />
                                <label for="">Số điện thoại</label>
                            </div>
                            <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p> {/* Hiển thị thông báo lỗi */}
                            <button type="submit">Đăng ký</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}