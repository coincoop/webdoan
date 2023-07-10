import React, { useState, useEffect, useLayoutEffect } from "react";

import axios from "axios";
import "../css/header.css";
import { API_URL } from "../config";
import "../css/quantities.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createAxios } from "../createInstance.js";
import { logoutSuccess } from "../redux/slice";
import { logoutUser } from "../redux/apiRequest.js";
import { animateScroll as scroll } from "react-scroll";
import jwt_decode from "jwt-decode";

import { QRCode, Image, Modal } from "antd";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
export default function Header() {
  const user = useSelector((state) => state.user.login.currentUser);
  const cart = useSelector((state) => state.cart);
  const [userCart, setUserCart] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [qrCodeSize, setQRCodeSize] = useState(420);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [totalUser, setTotalUser] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };
  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setQRCodeSize(280);
      } else {
        setQRCodeSize(420);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleQRCodeClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  //lấy quantity
  const sumQuantityLocal = cart.cart.reduce((acc, cartItem) => {
    return acc + cartItem.quantity;
  }, 0);
  const sumQuantityUser = userCart.reduce((acc, cartItem) => {
    return acc + cartItem.quantity;
  }, 0);
  const sumQuantity = user ? sumQuantityUser : sumQuantityLocal;

  // lấy total
  const totalLocal = cart.cart.reduce((acc, cartItem) => {
    return acc + cartItem.dongia * cartItem.quantity;
  }, 0);
  const getTotalUser = async () => {
    const response = await axios.get(`${API_URL}cart/thanhtien/${user?.makh}`);
    setTotalUser(response.data);
  };
  const total = user ? totalUser : totalLocal;

  const [searchTerm, setSearchTerm] = useState("");
  const [menus, setMenus] = useState([]);
  const [home, setHome] = useState([]);
  const [sdt, setSdt] = useState("");
  const [imghead, setImgHead] = useState("");
  const [name, setName] = useState("");
  const [product, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = user?.accessToken;

  const makh = user?.makh;
  const [searchText, setSearchText] = useState("");

  const [navFullscreenActive, setNavFullscreenActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [navMenuActive, setNavMenuActive] = useState(
    Array(menus.length).fill(false)
  );
  const [isNavContentVisible, setIsNavContentVisible] = useState(true);

  const getUserCart = async () => {
    try {
      let userId = user?.makh;
      const response = await axios.get(`${API_URL}cart/${userId}`);
      setUserCart(response.data);
    } catch (err) {
      console.log(err);
    }

  };

  const checkTokenExpiration = (accessToken) => {
  try {

    const decodedToken = jwt_decode(accessToken);

  
    const expirationTime = decodedToken.exp;

   
    const currentTime = Math.floor(Date.now() / 1000);

 
    if (expirationTime < currentTime) {
      console.log('Access token hết hạn');
       logoutUser(dispatch, makh, navigate, accessToken);
    } else {
      console.log('Access token còn hiệu lực');
      
    }
  } catch (error) {
    console.error('Lỗi khi giải mã access token:', error);
    
  }
};
 

  useEffect(() => {
    getTotalUser();
    getUserCart();
    checkTokenExpiration(accessToken)
    getProducts();
    setNavMenuActive(Array(menus.length).fill(false));
    setSubMenuActive([]);

    fetchMenus();

    fetchHome();

    function updateClass() {
      const element = document.getElementById("change-class-header");
      const element1 = document.getElementById("rowmenu");
      if (window.innerWidth < 820) {
        element.classList.add("order-1");
        element1.classList.add("bar");
      } else {
        element.classList.remove("order-1");
        element1.classList.remove("row");
      }
    }
    window.addEventListener("resize", updateClass);

    // Gọi hàm updateClass lần đầu để đảm bảo class được cập nhật khi trang được tải lần đầu
    updateClass();

    // Xóa sự kiện lắng nghe khi component bị unmount
    return () => window.removeEventListener("resize", updateClass);
  }, []);

  //cập nhật không khuyến khích dùng

  useEffect(() => {
    if(user != null){
       // Gọi getUserCart mỗi khi dữ liệu trong cơ sở dữ liệu thay đổi
    const interval = setInterval(() => {
      getUserCart();
    }, 3000); // Khoảng thời gian để kiểm tra cập nhật (ví dụ: 1 giây)

    return () => {
      clearInterval(interval); // Xóa interval khi component bị hủy
    };
    }

  }, []); // Gọi getUserCart khi component được render lần đầu tiên

  const getProducts = async () => {
    const response = await axios.get(`${API_URL}product`);
    await Promise.all(
      response.data.products.map(async (prod) => {
        if (prod.img) {
          const storageRef = ref(storage, `product/${prod.img}`);
          const imgUrl = await getDownloadURL(storageRef);
          prod.img = imgUrl;
        }
      })
    );
    setProducts(response.data.products);
  };
  const handleClickNav = () => {
    setIsNavContentVisible(false);
  };
  const fetchMenus = async () => {
    const response = await axios.get(`${API_URL}`);
    await Promise.all(
      response.data.map(async (menu) => {
        if (menu.img) {
          const storageRef = ref(storage, `menu/${menu.img}`);
          const imgUrl = await getDownloadURL(storageRef);
          menu.img = imgUrl;
        }
      })
    );
    console.log(response.data);
    setMenus(response.data);
  };
  const fetchHome = async () => {
    const response = await axios.get(`${API_URL}home/status`);
    const imghead = response.data.imghead;

    if (imghead) {
      const storageRef = ref(storage, `home/${imghead}`);
      const imgUrl = await getDownloadURL(storageRef);
      setImgHead(imgUrl);
    }
    setSdt(response.data.sdt);
    setName(response.data.ten);
  };
  const handleLogout = () => {
    logoutUser(dispatch, makh, navigate, accessToken);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setSearchText(event.target.value);
  };

  const handleSubmit = (e) => {
    if (searchText.trim() !== "") {
      navigate(`/search/${searchText}`);
    }
    // e.preventDefault();

    // if (searchText.trim() !== "") {
    //   navigate(`/search?query=${searchText}`);
    // }
  };

  const filteredProducts = product.filter((product) =>
    product.tensp
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .includes(
        searchTerm
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      )
  );

  const clickMenu = (index) => {
    const newNavMenuActive = [...navMenuActive];
    newNavMenuActive[index] = !newNavMenuActive[index];
    setNavMenuActive(newNavMenuActive);
    // Thêm dòng code dưới đây để đóng menu khi nhấp vào dropdown-toggle
    if (newNavMenuActive[index]) {
      for (let i = 0; i < newNavMenuActive.length; i++) {
        if (i !== index) {
          newNavMenuActive[i] = false;
        }
      }
      setNavMenuActive(newNavMenuActive);
    }
  };
  const [subMenuActive, setSubMenuActive] = useState([]);
  const handleSubMenuClick = (e) => {
    e.preventDefault();
  };
  const clickSubMenu = (index) => {
    setSubMenuActive((prevState) => {
      const newSubMenuActive = [...prevState];
      newSubMenuActive[index] = !newSubMenuActive[index];
      return newSubMenuActive;
    });
  };

  const closeNavFullscreen = () => {
    setNavFullscreenActive(false);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(false);
  };
  function handleNavFullscreenToggle() {
    setNavFullscreenActive(!navFullscreenActive);
  }
  const handleOverlayClick = () => {
    closeNavFullscreen();
  };
  const clickGrandChildSubmenu = (url) => {
    setIsLoading(true); // Bật trạng thái loading
    scroll.scrollToTop({
      duration: 1,
      smooth: true,
    });

    closeNavFullscreen();
    setIsLoading(false);
  };
  const scrollToTop = () => {
    scroll.scrollToTop({
      smooth: true,
      duration: 500,
    });
  };
  const clickChildSubmenu = (url) => {
    setIsLoading(true); // Bật trạng thái loading
    scroll.scrollToTop({
      duration: 1,
      smooth: true,
    });

    closeNavFullscreen();
    setIsLoading(false);
  };

  return (
    <>
      <div className="contact-section">
        <a href="tel:+1234567890" target="_blank" rel="noopener noreferrer">
          <div className="tel">
            <img src="/img/home/phone.png" alt="Phone" />
          </div>
        </a>
        <a
          href={`https://zalo.me/${sdt}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="zalo">
            <img src="/img/home/zalo.png" alt="Zalo" />
          </div>
        </a>
        {showBackToTop && (
          <a onClick={scrollToTop} id="back-to-top" href="#">
            👆🏼
          </a>
        )}
      </div>
      <section className="shopify-section spaced-header">
        <header className="header-4">
          {/* <div className="header-4-announcement-bar">
            <div className="container" id="change-screen">
              <div className="row">
                <div className="col-lg-6 header-4-announcement-bar-left d-flex justify-content-start">
                  <p>
                    <a
                      href={`https://zalo.me/${sdt}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Hotline: <span style={{ color: "red" }}>{sdt}</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          <div className="header-4-center">
            <div className="container" id="change-screen">
              <div className="row">
                <div className="header-categories ">
                  <div className="row">
                    <div className="col-8 col-md-3 col-lg-3 head-logo d-flex align-items-center">
                      <div>
                        <div onClick={handleQRCodeClick}>
                          <QRCode
                            value={`${API_URL}`}
                            size={70}
                            iconSize={50 / 4}
                            icon={imghead}
                          />
                        </div>

                        <Modal
                          visible={isModalVisible}
                          onCancel={handleModalCancel}
                          footer={null}
                          className="modalbox"
                        >
                          <div className="modal-content">
                            <QRCode
                              value={`${API_URL}`}
                              size={qrCodeSize}
                              iconSize={qrCodeSize / 4}
                              icon={imghead}
                            />
                          </div>
                        </Modal>
                      </div>
                      <a
                        href={"/"}
                        className="header__heading-link link link--text ms-3 d-flex align-items-center"
                      >
                        <span className="header__heading-text">{name}</span>
                      </a>
                    </div>
                    <div
                      className="col-12 col-md-6 col-lg-6 header-mobi-mobile header-search"
                      id="change-class-header"
                    >
                      <div className="row">
                        <div className="col-2">
                          <a
                            id="show-sidebar"
                            className=""
                            href="#"
                            onClick={handleNavFullscreenToggle}
                          >
                            <i className="fa fa-bars"></i>
                          </a>
                        </div>
                        <div className="icon-search col-10">
                          <div className="search-media">
                            <button>search</button>
                          </div>
                          <div className="form-search">
                            <form
                              action=""
                              method=""
                              onSubmit={handleSubmit}
                              className="search search-modal__form"
                            >
                              <div className="fieldSearch">
                                <input
                                  type="search"
                                  placeholder="Tìm kiếm sản phẩm "
                                  value={searchText}
                                  className="search__input fieldSearch__input"
                                  onChange={handleSearch}
                                />
                                <ul
                                  class="searchrs-contain"
                                  style={{
                                    border:
                                      searchTerm === ""
                                        ? "none"
                                        : "1px solid #000000",
                                  }}
                                >
                                  {filteredProducts.map((product) => (
                                    <li
                                      style={{
                                        display:
                                          searchTerm === "" ? "none" : "block",
                                      }}
                                      key={product.id}
                                    >
                                      <div className="itemSearch">
                                        <Link to={"/product/" + product.url}>
                                          <img
                                            src={product.img}
                                            alt={product.tensp}
                                          />
                                          <span>{product.tensp}</span>
                                        </Link>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                                <button
                                  className="search__button fieldSearch__button focus-inset justify-content-end"
                                  aria-label="Search"
                                >
                                  <i class="fa-solid fa-magnifying-glass fa-xl"></i>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-3 col-lg-3 header-icon">
                      <div className="header-sign">
                        <div className="user dropdown" title="Currencies ">
                          <span
                            className="pre-currencies"
                            data-bs-toggle="dropdown"
                          >
                            <i className="fa-regular fa-user fa-xl"></i>
                          </span>
                          <ul
                            id="currencies-thuy"
                            className="dropdown-menu shadow"
                          >
                            {user ? (
                              <>
                                <li>
                                  <Link to="/account/user">
                                    Hi, {user.tenkh} !
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/account/logout"
                                    onClick={handleLogout}
                                    title="Đăng xuất"
                                  >
                                    Đăng xuất
                                  </Link>
                                </li>
                              </>
                            ) : (
                              <>
                                <li>
                                  <a
                                    href={"/account/login"}
                                    className="site-header__link"
                                    title="Đăng nhập"
                                  >
                                    Đăng nhập
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={"/account/register"}
                                    title="Đăng kí"
                                  >
                                    Đăng kí
                                  </a>
                                </li>
                              </>
                            )}
                            {/* <li>
                              <a href={"/pages/wishlist"} title="Wishlist">
                                Yêu thích (
                                <span className="js-wishlist-count">0</span>)
                              </a>
                            </li>
                            <li>
                              <a
                                href={"/pages/compare"}
                                className="site-header__compare"
                                title="Compare"
                              >
                                So sánh (
                                <span className="js-compare-count text-center">
                                  0
                                </span>
                                )
                              </a>
                            </li> */}
                            <li>
                              <a href={"/cart"} title="Giỏ hàng">
                                Giỏ hàng
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {user ? (
                        <div className="header-sign-2">
                          <p>
                            <Link to="/account/user">HI, {user.tenkh} !</Link>
                          </p>
                          <p>
                            <Link to="/account/logout" onClick={handleLogout}>
                              Đăng xuất
                            </Link>
                          </p>
                        </div>
                      ) : (
                        <div className="header-sign-2">
                          <p>
                            <a
                              href={"/account/login"}
                              className="site-header__link"
                            >
                              Đăng nhập
                            </a>
                          </p>
                          <span>/</span>
                          <p>
                            <a href={"/account/register"} title="Register">
                              Đăng kí
                            </a>
                          </p>
                        </div>
                      )}
                      {/* <div className="header-sign-2">
                        <p>
                          <a
                            href={"/account/login"}
                            className="site-header__link"
                          >
                            Đăng nhập
                          </a>
                        </p>
                        <span>/</span>
                        <p>
                          <a href={"/account/register"} title="Register">
                            Đăng kí
                          </a>
                        </p>
                      </div> */}
                      <div className="header-wishlist">
                        <a className="btn-wishlist" href={"/pages/wishlist"}>
                          <i className="fa-regular fa-heart fa-xl"></i>

                          <div className="cart-count-bubble">
                            <p className="num-wishlisted">0</p>
                          </div>
                        </a>
                      </div>
                      <div className="header-cart">
                        <a href={"/cart"} className="btn-cart " >
                          <i
                            className="fa-solid fa-cart-shopping fa-xl"
                            style={{ cursor: "pointer" }}
                          ></i>

                          <div className="cart-count-cart-empty">
                            <p className="num-cart">
                              {" "}
                              {sumQuantity > 99 ? "99+" : sumQuantity}
                            </p>
                          </div>
                        </a>
                        {/* <ul className="dropdown-menu cart-menu-thuy">
                          <li className="total">
                            <label>Subtotal</label>:{" "}
                            <span className="total_price">
                              <span
                                className="money"
                                data-currency-usd="$0.00"
                                data-currency="USD"
                              >
                                {total.toLocaleString()} VNĐ
                              </span>
                            </span>
                          </li>
                          <li>
                            <div className="goto-cart">
                              <a href={"/cart"}>Go to Cart</a>
                            </div>
                          </li>
                          <li>
                            <button
                              type="submit"
                              className="cart__checkout-button button"
                              name="checkout"
                              disabled=""
                              form="cart"
                            >
                              Check out
                            </button>
                          </li>
                        </ul> */}
                      </div>
                      <div className="hotline">
                        <p>
                          <a
                            href={`https://zalo.me/${sdt}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Hotline: <span>{sdt}</span>
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`header-4-bottom ${navFullscreenActive ? "active" : ""}`}
          >
            <div className="overlay" onClick={handleOverlayClick}></div>
            <p
              className="phone"
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              <a
                href={`https://zalo.me/${sdt}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span style={{ color: "black" }}>Hotline:</span>{" "}
                <span style={{ color: "red" }}>{sdt}</span>
              </a>
            </p>
            <div>
              <a
                href={"/"}
                style={{ justifyContent: "center", display: "flex" }}
              >
                <img className="imghead" src={imghead} alt="" />
              </a>
            </div>

            <div className="container">
              <div id="rowmenu" className="row">
                <div className="justify-content-center header-megamenu">
                  <div className="nav-fullscreen ">
                    {menus
                      .filter((menu) => !menu.parent_id)
                      .map((menu, index) => {
                        const submenus = menus.filter(
                          (submenu) => submenu.parent_id === menu.id
                        );
                        const renderSubmenu = (submenu, parentIndex) => {
                          const childSubmenus = menus.filter(
                            (childSubmenu) =>
                              childSubmenu.parent_id === submenu.id
                          );
                          return (
                            <li className="submenu" key={submenu.id}>
                              <a href={`/${submenu.url}`} onClick={handleClick}>
                                <img
                                  src={submenu.img}
                                  style={{
                                    width: "24px",
                                    marginBottom: "5px",
                                    marginRight: "5px",
                                  }}
                                  alt=""
                                />
                                <span>{submenu.name}</span>
                              </a>
                              {childSubmenus.length > 0 && (
                                <span
                                  className="dropdown-toggle"
                                  onClick={() =>
                                    clickSubMenu(parentIndex, submenu.id)
                                  }
                                ></span>
                              )}
                              {childSubmenus.length > 0 && (
                                <div
                                  className={`submenucon ${subMenuActive?.[parentIndex]?.[submenu.id]
                                      ? "active"
                                      : ""
                                    }`}
                                >
                                  <div className="submenucon__row">
                                    {childSubmenus.map((childSubmenu) => (
                                      <div
                                        className="submenucon__col"
                                        key={childSubmenu.id}
                                      >
                                        <strong>
                                          <a
                                            href={`/${childSubmenu.url}`}
                                            onClick={() =>
                                              clickChildSubmenu(
                                                `/${childSubmenu.url}`
                                              )
                                            }
                                          >
                                            {childSubmenu.name}
                                          </a>
                                        </strong>

                                        {menus
                                          .filter(
                                            (grandChildSubmenu) =>
                                              grandChildSubmenu.parent_id ===
                                              childSubmenu.id
                                          )
                                          .map((grandChildSubmenu) => (
                                            <a
                                              key={grandChildSubmenu.id}
                                              href={`/${grandChildSubmenu.url}`}
                                              onClick={() =>
                                                clickGrandChildSubmenu(
                                                  `/${grandChildSubmenu.url}`
                                                )
                                              }
                                            >
                                              &#10148; {grandChildSubmenu.name}
                                            </a>
                                          ))}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </li>
                          );
                        };

                        return (
                          <div key={menu.id} className="nav-drop nav-item-thuy">
                            <Link
                              to={`/${menu.url}`}
                              className={`hover-underline-animation ${submenus.length > 0 ? "has-child" : ""
                                }`}
                              onClick={() => {
                                scroll.scrollToTop({
                                  duration: 1,
                                  smooth: true,
                                });
                              }}
                            >
                              <img
                                src={menu.img}
                                style={{ width: "24px", marginBottom: "5px" }}
                                alt=""
                              />
                              <span
                                style={{ margin: "10px", position: "bottom" }}
                              >
                                {menu.name}
                              </span>
                            </Link>
                            {submenus.length > 0 && (
                              <span
                                className="dropdown-toggle"
                                onClick={() => clickMenu(index)}
                              ></span>
                            )}
                            {submenus.length > 0 && (
                              <div
                                className={`nav-content ${isNavContentVisible ? "" : "hidden"
                                  } nav-content-thuy ${navMenuActive[index] ? "active" : ""
                                  }`}
                              >
                                <ul className={`ul-nav-content-thuy`}>
                                  {submenus.map((submenu) =>
                                    renderSubmenu(submenu)
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </section>

      {/* <script src={require("../js/header.js")}></script> */}
      {/* <Headerjs /> */}
      <Outlet />
    </>
  );
}
