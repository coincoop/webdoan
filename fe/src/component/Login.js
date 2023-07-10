import React, { useState, useEffect } from "react";
import "../css/login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/apiRequest.js";

import { useSelector } from "react-redux";
import {
  loginSuccess,
  loginFailed,
  loginStart,
  clearProduct,
} from "../redux/slice";
import store from "../redux/store";
import { API_URL } from "../config";
import jwt_decode from 'jwt-decode'

export default function Login() {
  const user = useSelector((state) => state.user.login.currentUser);

  const [username, setUsername] = useState("");
  const [matkhau, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post(`${API_URL}account/send-mail`, {
        email: email.toLowerCase(),
      });
      navigate(`/account/${email}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    const newUser = {
      username: username,
      matkhau: matkhau,
    };
    try {
      const res = await axios.post(`${API_URL}account/login`, newUser);

      const cart = store.getState().cart.cart;
      if (cart) {
        const masp = cart.map((item) => item.id);
        const quantity = cart.map((item) => item.quantity);
        await axios.post(`${API_URL}cart/addmulti`, {
          quantity: quantity,
          makh: res.data.makh,
          masp: masp,
        });
      }
      dispatch(loginSuccess(res.data));
      dispatch(clearProduct());
      if (res.data.vaitro === 1) {
        navigate("/admin");
      } else {
        navigate("/");
      }
      window.scrollTo(0, 0);
    } catch (error) {
      if (error.response) {
        // Xử lý lỗi từ phía server (response có status code)
        if (error.response.status === 401) {
          // Sai mật khẩu
          setErrorMessage("Sai mật khẩu");
        } else if (error.response.status === 404) {
          // Sai tên đăng nhập
          setErrorMessage("Sai tên đăng nhập hoặc mật khẩu");
        } else {
          // Xử lý các lỗi khác từ phía server
          dispatch(loginFailed("Đã có lỗi xảy ra"));
        }
      } else {
        // Xử lý lỗi không có response từ phía server
        dispatch(loginFailed("Đã có lỗi xảy ra"));
      }
    }
  };
  
  return (
    <>
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
            <span>Tài khoản</span>
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
            <h1 id="recover" tabindex="-1">
              Quên mật khẩu
            </h1>
            <div>
              <p>
                Chúng tôi sẽ gửi cho bạn một email để đặt lại mật khẩu của bạn
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  type="hidden"
                  name="form_type"
                  value="recover_customer_password"
                />
                <input type="hidden" name="utf8" value="✓" />
                <div class="field">
                  <input
                    type="email"
                    value={email}
                    name="email"
                    id="RecoverEmail"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                  <label for="RecoverEmail">Email</label>
                </div>
                <button type="submit">Tiếp theo</button>
                <a href="#login">Hủy</a>
              </form>
            </div>
            <h1 id="login" tabindex="-1">
              Đăng nhập
            </h1>
            <div>
              <form onSubmit={handleLogin}>
                <input type="hidden" name="form_type" value="customer_login" />
                <input type="hidden" name="utf8" value="✓" />
                <div class="field">
                  <input
                    type="text"
                    name="customer[email]"
                    id="CustomerEmail"
                    autocomplete="email"
                    autocorrect="off"
                    autocapitalize="off"
                    placeholder="Email"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label for="CustomerEmail">Tên đăng nhập</label>
                </div>
                <div class="field">
                  <input
                    type="password"
                    name="customer[password]"
                    id="CustomerPassword"
                    autocomplete="current-password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label for="CustomerPassword">Mật khẩu</label>
                </div>
                <p className="error-message" style={{ color: "red" }}>
                  {errorMessage}
                </p>{" "}
                {/* Hiển thị thông báo lỗi */}
                <a href="#recover">Quên mật khẩu?</a>
                <button>Đăng nhập</button>
                <a href="/account/register">Tạo tài khoản</a>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
