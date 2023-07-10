import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../css/cart.css";
import { API_URL } from "../config";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import { Helmet } from "react-helmet";
export default function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.login.currentUser);
  const [userCart, setUserCart] = useState([]);
  const [productsByMakh, setProductsByMakh] = useState([]);
    useEffect(() => {
      getUserCart();
    }, []);
  let tongcong = 0;

  const getUserCart = async () => {
    try {
      let userId = user?.makh;
      const response = await axios.get(`${API_URL}cart/${userId}`);
      setUserCart(response.data);
  
      const maspArray = response.data.map((item) => item.masp);
      const products = await getProductsByMakh(maspArray);
      await Promise.all(
        products.map(async (prod) => {
          if (prod.img) {
            const storageRef = ref(storage, `product/${prod.img}`);
            const imgUrl = await getDownloadURL(storageRef);
            prod.img = imgUrl;
          }
        })
      );
      setProductsByMakh(products);
    } catch (error) {
        console.log(error);
    }
   
  };

  const getProductsByMakh = async (maspArray) => {
    const products = [];
    for (let i = 0; i < maspArray.length; i++) {
      const response = await axios.get(`${API_URL}product/${maspArray[i]}`);
      products.push(response.data);
    }
    return products;
  };

  const deleteProduct = async (masp, makh) => {
    try {
      await axios.delete(`${API_URL}cart/${masp}/${makh}`);
      await getUserCart();
    } catch (error) {
      console.log(error);
    }
  };

  //xóa multi

  const [selectedIds, setSelectedIds] = useState([]);

  const handleDeleteMultiple = async () => {
    try {
      const makh = user.makh;
      const res = await axios.delete(`${API_URL}cart`, {
        data: { masp: selectedIds, makh },
      });
      await getUserCart();
      console.log(res);
    } catch (error) {
      console.log(error);
      console.log(selectedIds);
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  //sửa quantity product trong cart
  const handleChangeQuanity = async (quantitycheck, masp) => {
    try {
      const makh = user.makh;
      const quantity = quantitycheck == 0 ? 1 : quantitycheck;
      const res = await axios.patch(`${API_URL}cart`, {
        makh,
        masp,
        quantity,
      });
      console.log(res);
      getUserCart();
    } catch (error) {
      console.log(error);
    }
    // setQuantityEdit(quantity);
    // setMaspEdit(masp);
    // console.log(quantity+' '+masp);
  };

  const cartData = user !== null ? productsByMakh : cart;
  

  return (
    <>
      <Helmet>
        <title>{`Giở hàng - Gaming Zone`}</title>
      </Helmet>
      <section>
        <div className="cart-thuy container">
          {cartData.length === 0 ? (
            <div class="container">
              <div class="card">
                <h5 class="card-title">Giỏ Hàng</h5>
              </div>
              <div class="centercart">
                <img src="./cart.webp" alt="" />
                <h4>Không có sản phẩm nào!</h4>
                <h6>Thêm sản phẩm ngay</h6>
                <button class="btn btn-primary">
                  <Link to="/">Mua ngay</Link>
                </button>
              </div>
            </div>
          ) : (
            <div class="container mt-4">
              <table class="table table-bordered">
                <thead class="table-dark">
                  <tr>
                    <th></th>
                    <th></th>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>SL</th>
                    <th>Giá</th>
                    <th>Thành tiền</th>
                    <th></th>
                  </tr>
                </thead>
                {user !== null ? (
                  <tbody>
                    {cartData.map((product, index) => {
                      const stt = index + 1;
                      const thanhTien =
                        product.dongia * (userCart[index]?.quantity || 0);
                      tongcong += thanhTien;
                      return (
                        <tr key={product.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(product.id)}
                              onChange={() => handleCheckboxChange(product.id)}
                            />
                          </td>
                          <td>
                            <img src={product.img} alt={product.tensp} />
                          </td>
                          <td>{stt}</td>
                          <td>{product.tensp}</td>
                          <td>
                            <input
                              class="form-control"
                              min={1}
                              type="number"
                              name=""
                              onChange={(e) =>
                                handleChangeQuanity(e.target.value, product.id)
                              }
                              defaultValue={
                                userCart[index]?.quantity.toLocaleString() || 0
                              }
                            />
                          </td>
                          <td>
                            {parseInt(product.dongia).toLocaleString("vi-VN")}
                          </td>
                          <td>{thanhTien.toLocaleString("vi-VN")}</td>
                          <td>
                            <button
                              class="btn btn-danger"
                              type=""
                              onClick={() =>
                                deleteProduct(product.id, user.makh)
                              }
                            >
                              <i class="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td colspan="6">Tổng cộng</td>
                      <td colspan="2">{tongcong.toLocaleString("vi-VN")}</td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {cartData.map((product, index) => {
                      const stt = index + 1;
                      const thanhTien = product.dongia * product.quantity;
                      tongcong += thanhTien;
                      return (
                        <tr key={product.id}>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td>
                            <img src={product.img} alt={product.tensp} />
                          </td>
                          <td>{stt}</td>
                          <td>{product.tensp}</td>
                          <td>{product.quantity}</td>
                          <td>
                            {parseInt(product.dongia).toLocaleString("vi-VN")}
                          </td>
                          <td>{thanhTien.toLocaleString("vi-VN")}</td>
                          <td>
                            <button class="btn btn-danger" type="">
                              Xóa
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td colspan="7">Tổng cộng</td>
                      <td colspan="">{tongcong.toLocaleString("vi-VN")}</td>
                    </tr>
                  </tbody>
                )}
              </table>
              {user !== null ? (
                <div class="d-flex justify-content-between">
                  <button class="btn btn-danger" onClick={handleDeleteMultiple}>
                    Xóa Đã Chọn ({selectedIds.length})
                  </button>
                  <div>
          <Link class="btn btn-primary" to="/payment">
            Thanh toán
          </Link>
        </div>
                </div>
              ) : (
                <div class="d-flex justify-content-between">
                  <button class="btn btn-danger">Xóa local</button>
                  <div>
          <Link class="btn btn-primary" to="/account/login">
            Vui lòng đăng nhập để thanh toán
          </Link>
        </div>
                </div>
                
              )}
            </div>
          )}
        </div>
        
      </section>
    </>
  );
}
