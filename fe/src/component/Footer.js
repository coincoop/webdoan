import React, { useEffect, useState } from "react";
import "../css/footer.css";
import {
  FaFacebook,
  FaTwitter,
  FaGooglePlus,
  FaMap,
  FaPhone,
  FaEnvelopeOpen,
  FaTelegram,
} from "react-icons/fa";
import { API_URL } from "../config";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

import axios from "axios";
export default function Footer() {
  const [sdt, setSdt] = useState("");
  const [diachi, setDiachi] = useState("");
  const [gmail, setGmail] = useState("");
  const [imgfoot, setImgFooter] = useState("");
  const [motaFooter, setMotaFooter] = useState("");
  useEffect(() => {
    const fetchHome = async () => {
      const response = await axios.get(`${API_URL}home/status`);
      const imgfoot = response.data.imgfoot;
      if (imgfoot) {
        const storageRef = ref(storage, `home/${imgfoot}`);
        const imgUrl = await getDownloadURL(storageRef);
        setImgFooter(imgUrl);
      }
      
      setSdt(response.data.sdt);
      setDiachi(response.data.diachi);
      setGmail(response.data.gmail);
      
      setMotaFooter(response.data.motaFooter);
    };
    fetchHome();
  }, []);
  return (
    <div className="footer-section">
      <div className="container">
        <div className="footer-cta pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-md-4 col-sm-4 mb-30">
              <div className="single-cta">
                <i>
                  <FaMap />
                </i>
                <div className="cta-text">
                  <h4>Địa chỉ</h4>
                  <span>{diachi}</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 col-sm-4 mb-30">
              <div className="single-cta">
                <i>
                  <FaPhone />
                </i>
                <div className="cta-text">
                  <h4>Số điện thoại</h4>
                  <span>
                    <a
                      href={`https://zalo.me/${sdt}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span style={{ color: "red", fontSize: "16px" }}>
                        {sdt}
                      </span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 col-sm-4 mb-30">
              <div className="single-cta">
                <i>
                  <FaEnvelopeOpen />
                </i>
                <div className="cta-text">
                  <h4>Gmail</h4>
                  <span>{gmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-content pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-logo">
                  <a href="#">
                    <img
                      src={imgfoot}
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="footer-text">
                  <p>
                    <div dangerouslySetInnerHTML={{ __html: motaFooter }} />
                  </p>
                </div>
                {/* <div className="footer-social-icon">
                  <span>Follow us</span>
                  <a href="#">
                    <i className="IconFacebook">
                      <FaFacebook />
                    </i>
                  </a>
                  <a href="#">
                    <i className="IconTwitter">
                      <FaTwitter />
                    </i>
                  </a>
                  <a href="#">
                    <i className="IconGoogle">
                      <FaGooglePlus />
                    </i>
                  </a>
                </div> */}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Chăm sóc khách hàng</h3>
                </div>
                <ul>
                  <li>
                    <a href="#">Trang chủ</a>
                  </li>
                  <li>
                    <a href="#">blog</a>
                  </li>
                  <li>
                    <a href="#">giới thiệu</a>
                  </li>
                  <li>
                    <a href="#">liên hệ</a>
                  </li>
                  <li>
                    <a href="#">danh mục</a>
                  </li>
                  <li>
                    <a href="#">dịch vụ</a>
                  </li>
                  <li>
                    <a href="#">chính sách vận chuyển</a>
                  </li>
                  <li>
                    <a href="#">chính sách bảo mật</a>
                  </li>
                  <li>
                    <a href="#">chính sách bảo hành</a>
                  </li>
                  <li>
                    <a href="#">chính sách hoàn trả tiền</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Đăng ký</h3>
                </div>
                <div className="footer-text mb-25">
                  <p>
                    Đừng bỏ lỡ đăng ký nguồn cấp dữ liệu mới của chúng tôi, vui
                    lòng điền vào mẫu dưới đây.
                  </p>
                </div>
                <div className="subscribe-form">
                  <form action="#">
                    <input type="text" placeholder="Email" />
                    <button>
                      <i>
                        <FaTelegram />
                      </i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="copyright-area">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 text-lg-left">
                            <div className="copyright-text">
                                <p>Copyright &copy; 2018, All Right Reserved <a href="https://codepen.io/anupkumar92/">Anup</a></p>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                            <div className="footer-menu">
                                <ul>
                                    <li><a href="#">Điều Kiện</a></li>
                                    <li><a href="#">Quyền Riêng Tư</a></li>
                                    <li><a href="#">Chính Sách</a></li>
                                    <li><a href="#">Liên Hệ</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
    </div>
  );
}
