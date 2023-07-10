import React, { useState, useEffect } from "react";
import "../css/account.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../config";
import { getDownloadURL, ref } from "firebase/storage";
import { Helmet } from "react-helmet-async";
import { storage } from "../firebase";
export default function Account() {
  const user = useSelector((state) => state.user.login.currentUser);
  const [userHoadon0, setUserHoadon0] = useState([]);
  const [userHoadon1, setUserHoadon1] = useState([]);
  const [userHoadon2, setUserHoadon2] = useState([]);
  const [productsByMakh, setProductsByMakh] = useState([]);
  const [products0, setProducts0] = useState([]);
  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading0, setLoading0] = useState(true);
  useEffect(() => {
    getUserHoadon();
  }, []);
  let tongcong = 0;
  // const getUserHoadon = async () => {
  //   let userid = user.makh;
  //   const response = await axios.get(`${API_URL}admin/cthoadon/${userid}`);
  //   console.log(response.data);
  //   setUserHoadon(response.data);
  //   const maspArray = response.data.map((item) => item.masp);
  //   const products = await getProductsByMasp(maspArray);
  //   setProductsByMakh(products);
  //   setLoading(false);
  // };

  const getUserHoadon = async () => {
    let userid = user.makh;
    const response = await axios.get(`${API_URL}admin/cthoadon/${userid}`);

    const arrayTinhTrang0 = response.data.filter((item) => item.tinhtrang == 0);
    const arrayTinhTrang1 = response.data.filter((item) => item.tinhtrang == 1);
    const arrayTinhTrang2 = response.data.filter((item) => item.tinhtrang == 2);

    setUserHoadon0(arrayTinhTrang0)
    setUserHoadon1(arrayTinhTrang1)
    setUserHoadon2(arrayTinhTrang2)

    const maspArray0 = arrayTinhTrang0.map((item) => item.masp);
    const maspArray1 = arrayTinhTrang1.map((item) => item.masp);
    const maspArray2 = arrayTinhTrang2.map((item) => item.masp);
    const products0 = await getProductsByMasp(maspArray0);
    const products1 = await getProductsByMasp(maspArray1);
    const products2 = await getProductsByMasp(maspArray2);
    setProducts0(products0);
    setProducts0(products1);
    setProducts0(products2);
    setLoading(false);
    setLoading0(false);
  };

  const getProductsByMasp = async (maspArray) => {
    const products = [];
    for (let i = 0; i < maspArray.length; i++) {
      const response = await axios.get(`${API_URL}product/acccart/${maspArray[i]}`);
      const productData = response.data;

      // Lấy đường dẫn ảnh từ Firebase Storage

      const storageRef = ref(storage, `product/${productData.img}`);
      const imgUrl = await getDownloadURL(storageRef);

      const product = {
        ...productData,
        imgUrl: imgUrl,
      };

      products.push(product);
    }
    return products;
  };

  if (user == null) {
    return <div>Vui lòng đăng nhập!!!</div>;
  } else {
    return (
      <section className="info-user ">
        <Helmet>
          <title>Thông tin khách hàng</title>
        </Helmet>

        <div className="container">
          <div class="profile-container  row">
            <div class="sidebar col-lg-4 col-md-2 col-6">
              <ul class="sidebar-menu">
                <li class="menu-item active">
                  <Link to="/account/user" class="menu-link">
                    <i class="fas fa-user"></i>
                    <span class="menu-text">Thông tin khách hàng</span>
                  </Link>
                </li>
                <li class="menu-item">
                  <Link to="/account/cart" class="menu-link">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="menu-text">Đơn hàng</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div class="profile-main col-lg-8 col-md-10 col-6">
              <div class="profile-header">
                <h2 class="profile-title">Thông tin đơn hàng</h2>
              </div>
              <div class="profile-body ">
                <ul class="nav nav-pills justify-content-center">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      data-bs-toggle="pill"
                      href="#home"
                    >
                      Chờ xác nhận
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="pill" href="#option1">
                      Đang giao
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="pill" href="#option2">
                      Hoàn thành
                    </a>
                  </li>
                </ul>

                <div class="tab-content">
                  {loading && <div><div class="box-of-star1">
                    <div class="star star-position1"></div>
                    <div class="star star-position2"></div>
                    <div class="star star-position3"></div>
                    <div class="star star-position4"></div>
                    <div class="star star-position5"></div>
                    <div class="star star-position6"></div>
                    <div class="star star-position7"></div>
                  </div>
                    <div class="box-of-star2">
                      <div class="star star-position1"></div>
                      <div class="star star-position2"></div>
                      <div class="star star-position3"></div>
                      <div class="star star-position4"></div>
                      <div class="star star-position5"></div>
                      <div class="star star-position6"></div>
                      <div class="star star-position7"></div>
                    </div>
                    <div class="box-of-star3">
                      <div class="star star-position1"></div>
                      <div class="star star-position2"></div>
                      <div class="star star-position3"></div>
                      <div class="star star-position4"></div>
                      <div class="star star-position5"></div>
                      <div class="star star-position6"></div>
                      <div class="star star-position7"></div>
                    </div>
                    <div class="box-of-star4">
                      <div class="star star-position1"></div>
                      <div class="star star-position2"></div>
                      <div class="star star-position3"></div>
                      <div class="star star-position4"></div>
                      <div class="star star-position5"></div>
                      <div class="star star-position6"></div>
                      <div class="star star-position7"></div>
                    </div>
                    <div data-js="astro" class="astronaut">
                      <div class="head"></div>
                      <div class="arm arm-left"></div>
                      <div class="arm arm-right"></div>
                      <div class="body">
                        <div class="panel"></div>
                      </div>
                      <div class="leg leg-left"></div>
                      <div class="leg leg-right"></div>
                      <div class="schoolbag"></div>
                    </div></div>}
                  {!loading && (
                    <div
                      class="tab-pane container active table-cart-thuy"
                      id="home"
                    >
                      <table>
                        <thead>
                          <tr>
                            <th></th>

                            <th>Mã hóa đơn</th>
                            <th>Tên sản phẩm</th>
                            <th>SL</th>
                            <th>Giá</th>
                            <th className="th-thanhtien-thuy">Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading0 ? (
                            // Hiển thị thông báo loading hoặc spinner
                            <tr>
                              <td colSpan="6">Đang tải dữ liệu...</td>
                            </tr>
                          ) : (
                            // Kiểm tra nếu products0 rỗng, trả về thông báo
                            products0.length === 0 ? (
                              <tr>
                                <td colSpan="6">Chưa có hóa đơn nào</td>
                              </tr>
                            ) : (
                              // Trường hợp products0 không rỗng, render các phần tử
                              products0.map((product, index) => {
                                const thanhTien =
                                  product.dongia * (userHoadon0[index]?.soluong || 0);
                                tongcong += thanhTien;

                                return (
                                  <tr key={product.id}>
                                    <td>
                                      <img src={product.imgUrl} alt="" />
                                    </td>
                                    <td>{userHoadon0[index].mahd}</td>
                                    <td>{product.tensp}</td>
                                    <td className="input-quantity">
                                      {userHoadon0[index]?.soluong.toLocaleString()}
                                    </td>
                                    <td className="dongia-thuy">
                                      {parseInt(product.dongia).toLocaleString("vi-VN")}
                                    </td>
                                    <td className="thanhtien-thuy">
                                      {thanhTien.toLocaleString("vi-VN")}
                                    </td>
                                  </tr>
                                );
                              })
                            )
                          )}
                        </tbody>


                      </table>
                    </div>
                  )}
                  <div class="tab-pane container fade" id="option1">
                    <table>
                      <thead>
                        <tr>
                          <th></th>

                          <th>Mã hóa đơn</th>
                          <th>Tên sản phẩm</th>
                          <th>SL</th>
                          <th>Giá</th>
                          <th className="th-thanhtien-thuy">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                          {loading0 ? (
                            // Hiển thị thông báo loading hoặc spinner
                            <tr>
                              <td colSpan="6">Đang tải dữ liệu...</td>
                            </tr>
                          ) : (
                            // Kiểm tra nếu products0 rỗng, trả về thông báo
                            products1.length === 0 ? (
                              <tr>
                                <td colSpan="6">Chưa có hóa đơn nào</td>
                              </tr>
                            ) : (
                              // Trường hợp products0 không rỗng, render các phần tử
                              products1.map((product, index) => {
                                const thanhTien =
                                  product.dongia * (userHoadon1[index]?.soluong || 0);
                                tongcong += thanhTien;

                                return (
                                  <tr key={product.id}>
                                    <td>
                                      <img src={product.imgUrl} alt="" />
                                    </td>
                                    <td>{userHoadon1[index].mahd}</td>
                                    <td>{product.tensp}</td>
                                    <td className="input-quantity">
                                      {userHoadon1[index]?.soluong.toLocaleString()}
                                    </td>
                                    <td className="dongia-thuy">
                                      {parseInt(product.dongia).toLocaleString("vi-VN")}
                                    </td>
                                    <td className="thanhtien-thuy">
                                      {thanhTien.toLocaleString("vi-VN")}
                                    </td>
                                  </tr>
                                );
                              })
                            )
                          )}
                        </tbody>

                    </table>
                  </div>
                  <div class="tab-pane container fade" id="option2">
                    <table>
                      <thead>
                        <tr>
                          <th></th>

                          <th>Mã hóa đơn</th>
                          <th>Tên sản phẩm</th>
                          <th>SL</th>
                          <th>Giá</th>
                          <th className="th-thanhtien-thuy">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                          {loading0 ? (
                            // Hiển thị thông báo loading hoặc spinner
                            <tr>
                              <td colSpan="6">Đang tải dữ liệu...</td>
                            </tr>
                          ) : (
                            // Kiểm tra nếu products0 rỗng, trả về thông báo
                            products2.length === 0 ? (
                              <tr>
                                <td colSpan="6">Chưa có hóa đơn nào</td>
                              </tr>
                            ) : (
                              // Trường hợp products0 không rỗng, render các phần tử
                              products2.map((product, index) => {
                                const thanhTien =
                                  product.dongia * (userHoadon2[index]?.soluong || 0);
                                tongcong += thanhTien;

                                return (
                                  <tr key={product.id}>
                                    <td>
                                      <img src={product.imgUrl} alt="" />
                                    </td>
                                    <td>{userHoadon2[index].mahd}</td>
                                    <td>{product.tensp}</td>
                                    <td className="input-quantity">
                                      {userHoadon2[index]?.soluong.toLocaleString()}
                                    </td>
                                    <td className="dongia-thuy">
                                      {parseInt(product.dongia).toLocaleString("vi-VN")}
                                    </td>
                                    <td className="thanhtien-thuy">
                                      {thanhTien.toLocaleString("vi-VN")}
                                    </td>
                                  </tr>
                                );
                              })
                            )
                          )}
                        </tbody>


                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    );
  }
}
