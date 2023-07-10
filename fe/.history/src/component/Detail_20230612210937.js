import React from "react";
import "../css/detail.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Currency from "./body/Currency";

import { addProduct } from "../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/apiRequest.js";
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  WhatsappShareButton
} from "react-share";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { animateScroll as scroll } from "react-scroll";
import { API_URL } from "../config";
import Rating from "@mui/material/Rating";
import { Pagination } from "antd";
import Tooltip from "rc-tooltip";
import Modal from "react-modal";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

export default function Detail() {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value >= 1) {
      setQuantity(value);
    }
  };
  const { url } = useParams();
  const user = useSelector((state) => state.user.login.currentUser);
  const [product, setProduct] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [tenkhByMakh, setTenkhByMakh] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  const handleQuantityIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = relatedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const ModalContent = ({ product, closeModal }) => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
      setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
      if (quantity > 1) {
        setQuantity((prevQuantity) => prevQuantity - 1);
      }
    };

    const handleAddToCart = () => {
      // Add logic to handle adding the product to the cart
    };

    return (
      <div class="modal fade" className="modal-content" id="myModal">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                onClick={closeModal}
              ></button>
            </div>

            <div class="modal-body">
              <div class="row">
                <div class="col-6">
                  <img
                    src={product.img}
                    alt={product.tensp}
                    style={{ width: "100%", height: "300px" }}
                  />
                </div>
                <div class="col-6">
                  <h2>{product.tensp}</h2>
                  <p class="mota-modal">{product.mota}</p>
                  <p class="price-modal">
                    {product.giacu && product.giacu > 0 ? (
                      <div style={{ fontSize: "15px" }}>
                        <del>
                          <Currency value={product.giacu} />
                        </del>
                      </div>
                    ) : null}
                    <div
                      style={{
                        fontSize: "20px",
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      <Currency value={product.dongia} />
                    </div>
                  </p>

                  <div className="modal-quantity">
                    Số lượng:{" "}
                    <button className="quantity-btn" onClick={decreaseQuantity}>
                      -
                    </button>{" "}
                    {quantity}{" "}
                    <button className="quantity-btn" onClick={increaseQuantity}>
                      +
                    </button>
                  </div>

                  <div
                    class="d-flex gap-2 flexbut"
                    style={{ marginTop: "30px" }}
                  >
                    <button type="button" class="btn btn-danger " active>
                      Thêm vào giỏ hàng
                    </button>
                    <div>
                      <Link
                        to={`/product/${product.url}`}
                        onClick={() => {
                          scroll.scrollToTop({
                            duration: 1,
                            smooth: true,
                          });
                        }}
                      >
                        <button type="button" class="btn btn-primary " active>
                          Xem chi tiết sản phẩm
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getReview();
    fetchData();
    
  }, [url]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}${url}`);
      const product = response.data.product;
      const imgCon = product.img_con;

      if (imgCon) {
        const imgUrls = await Promise.all(
          imgCon.split(",").map(async (img) => {
            const storageRef = ref(storage, `product/${img}`);
            const imgUrl = await getDownloadURL(storageRef);
            return {
              original: imgUrl,
              thumbnail: imgUrl,
              originalAlt: product.tensp,
              thumbnailAlt: product.tensp,
            };
          })
        );
        product.imgConUrls = imgUrls;
      }
      if (product.img) {
        const storageRef = ref(storage, `product/${product.img}`);
        const imgUrl = await getDownloadURL(storageRef);
        product.imgUrl = imgUrl;
      }
      await Promise.all(
        response.data.relatedProducts.map(async (prod) => {
          if (prod.img) {
            const storageRef = ref(storage, `product/${prod.img}`);
            const imgUrl = await getDownloadURL(storageRef);
            prod.img = imgUrl;
          }
        })
      );
      setProduct(product);
      setRelatedProducts(response.data.relatedProducts);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (product) {
      const titleElement = document.querySelector("title");
      if (titleElement) {
        titleElement.textContent = `${product.tensp} - Vpp Phú Cường`;
      }
  
      // Cập nhật description
      const descriptionElement = document.querySelector('meta[name="description"]');
      if (descriptionElement) {
        descriptionElement.setAttribute("content", `${product.mota}`);
      }
  
      // Cập nhật og:title
      const ogTitleElement = document.querySelector('meta[property="og:title"]');
      if (ogTitleElement) {
        ogTitleElement.setAttribute("content", product.tensp);
      }
  
      // Cập nhật og:description
      const ogDescriptionElement = document.querySelector('meta[property="og:description"]');
      if (ogDescriptionElement) {
        ogDescriptionElement.setAttribute("content", product.mota);
      }
  
      const ogimageElement = document.querySelector('meta[property="og:image"]');
      if (ogimageElement) {
        ogimageElement.setAttribute("content", product.imgUrl);
      }
    }
  }, [product]);
  const productUrl = window.location.href;

  const handleAddtocart = () => {
    dispatch(addProduct({ product, quantity }));
    console.log("added");
  };

  const handleAddToCartUser = async () => {
    const newCart = { makh: user?.makh, masp: product.id, quantity };
    await addToCart(newCart);
  };
  const [review, setReview] = useState([]);
  const tongDanhgia = review.reduce((acc, item) => {
    return acc + item.danhgia;
  }, 0);
  const avDanhgia = tongDanhgia / review.length;
  const accessToken = user?.accessToken;
  const getTenkhByMakh = async (makhArray) => {
    const tenkhs = [];
    if (user !== null) {
      for (let i = 0; i < makhArray.length; i++) {
        const response = await axios.get(`${API_URL}account/${makhArray[i]}`, {
          headers: { token: accessToken },
        });
        tenkhs.push(response.data);
        setIsLoading(false);
      }
    } else {
      for (let i = 0; i < makhArray.length; i++) {
        const response = await axios.get(
          `${API_URL}account/tenkh/${makhArray[i]}`,
          {
            headers: { token: accessToken },
          }
        );
        tenkhs.push(response.data);
        setIsLoading(false);
      }
    }
    return tenkhs;
  };

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [showFullContent, setShowFullContent] = useState(false);

  const handleDanhgiaClick = async () => {
    
    try {
      const makh = user?.makh;
      const masp = product.id;
      const ratingVal = rating;
      const commentVal = comment;
      if(commentVal !== ""){
        await axios.post(`${API_URL}review/add`, {
          makh,
          masp,
          danhgia: ratingVal,
          noidung: commentVal,
        });
        setComment("");
        setRating(5);
        getReview();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteReview = async () => {
    try {
      const makh = user?.makh;
      const masp = product.id;
      console.log(makh);
      await axios.delete(`${API_URL}review/delete`, {
        data: {
          makh,
          masp,
        },
      });
      getReview();
    } catch (error) {
      console.log(error);
    }
  };
  const currentUserReview = review.find((re) => re.makh === user?.makh);
  const otherReviews = review.filter((re) => re.makh !== user?.makh);
  const newReviews = [currentUserReview, ...otherReviews];

  const sortedReviews = currentUserReview == null ? review : newReviews;
  const getReview = async () => {
    try {
      const response = await axios.get(`${API_URL}review/${url}`);
      setReview(response.data);
      const currentUserReview = response.data.find(
        (re) => re.makh === user?.makh
      );
      const otherReviews = response.data.filter((re) => re.makh !== user?.makh);
      const newReviews = [currentUserReview, ...otherReviews];
      const makhArray =
        currentUserReview == null
          ? response.data.map((item) => item.makh)
          : newReviews.map((item) => item.makh);
      const tenkhs = await getTenkhByMakh(makhArray);
      setTenkhByMakh(tenkhs);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //showmore và hidden

  //phân trang review
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const fistIndex = lastIndex - recordsPerPage;
  const paginaReview = sortedReviews.slice(fistIndex, lastIndex);
  const npage = Math.ceil(sortedReviews.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [currentPageReview, setCurrentPageReview] = useState(1);

  const prePage = () => {
    if (currentPageReview !== fistIndex + 1) {
      setCurrentPageReview(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPageReview !== npage) {
      setCurrentPageReview(currentPage + 1);
    }
  };

  const changeCurrentPage = (n) => {
    setCurrentPageReview(n);
  };

  //phân trang plus cấm xóa
  //     const [startPage, setStartPage] = useState(1);
  // const maxPages = 5;

  // // ...

  // {numbers.map((n, i) => {
  //   const pageNumber = startPage + i;

  //   return (
  //     <li className={`page-item ${currentPage === pageNumber ? "active" : ""}`} key={i}>
  //       <a
  //         className="page-link"
  //         style={{ cursor: "pointer" }}
  //         onClick={() => changeCurrentPage(pageNumber)}
  //       >
  //         {pageNumber}
  //       </a>
  //     </li>
  //   );
  // })}

  // // ...

  // const prePage = () => {
  //   if (currentPageReview !== fistIndex + 1) {
  //     setCurrentPageReview(currentPageReview - 1);
  //     if (currentPageReview === startPage) {
  //       setStartPage(startPage - 1);
  //     }
  //   }
  // };

  // const nextPage = () => {
  //   if (currentPageReview !== npage) {
  //     setCurrentPageReview(currentPageReview + 1);
  //     if (currentPageReview === startPage + maxPages - 1) {
  //       setStartPage(startPage + 1);
  //     }
  //   }
  // };

  if (isLoading) {
    return (
      <div className="load">
        <div class="loader" />
      </div>
    );
  } else {
    return (
      <>
        <main class="detail-thuy">
          <section>
            <div class="container">
              <div class="row">
                <div class="col-lg-7 col-md-12">
                  <div class="contain-img">
                    <div>
                      {product && product.img_con && (
                        <ImageGallery
                          items={product?.imgConUrls}
                          showNav={false}
                          showPlayButton={false}
                          showFullscreenButton={false}
                          slideDuration={400}
                          slideInterval={2000}
                          thumbnailPosition="bottom"
                          renderFullscreenButton={(onClick, isFullscreen) => (
                            <button
                              type="button"
                              className={`image-gallery-icon ${
                                isFullscreen
                                  ? "image-gallery-exit-fullscreen-button"
                                  : "image-gallery-fullscreen-button"
                              }`}
                              onClick={onClick}
                              title={
                                isFullscreen ? "Exit Fullscreen" : "Fullscreen"
                              }
                            />
                          )}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div class="col-lg-5 col-md-12">
                

                  <div class="title-info">
                    {product.thuonghieu && (
                      <p>Thương hiệu: {product.thuonghieu}</p>
                    )}
                    <h1>{product.tensp}</h1>
                  </div>

                  <div class="star-review">
                    <Rating
                      name="read-only"
                      value={avDanhgia}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <div class="contain-price">
                    <div class="price-regular">
                      {product.giacu && product.giacu > 0 ? (
                        <div>
                          <span
                            style={{ fontSize: "16px", display: "block" }}
                            className="original-price"
                          >
                            <del>
                              <Currency value={product.giacu} />
                            </del>
                          </span>
                          <span
                            style={{ color: "red" }}
                            className="discounted-price"
                          >
                            <Currency value={product.dongia} />
                          </span>
                        </div>
                      ) : product.dongia ? (
                        <span style={{ color: "red" }}>
                          <Currency value={product.dongia} />
                        </span>
                      ) : (
                        <span style={{ color: "red" }}>Liên hệ</span>
                      )}
                    </div>
                    <div class="price-sale">{/* developing */}</div>
                  </div>
                  {product.donvitinh && <p>Đơn vị tính: {product.donvitinh}</p>}
                  {product.donggoi && <p>Đóng gói: {product.donggoi}</p>}
                  {product.color && <p>Màu: {product.color}</p>}
                  {product.dinhluong && <p>Định lượng: {product.dinhluong}</p>}
                  {product.chatlieu && <p>Chất liệu: {product.chatlieu}</p>}
                  {product.khogiay && <p>Khổ giấy: {product.khogiay}</p>}
                  {product.kichthuoc && <p>Kích thước: {product.kichthuoc}</p>}
                  {product.thetich && <p>Thể tích: {product.thetich}</p>}
                  {product.xuatxu && <p>Xuất xứ: {product.xuatxu}</p>}

                  <div dangerouslySetInnerHTML={{ __html: product.mota }} />
                  {/* <div class="status-product">
                  <p>Hurrify, only few left</p>
                  <div class="progress">
                    <div class="progress-bar bg-secondary">2</div>
                  </div>
                </div> */}
                  <div class="contain-quantity">
                    <label for="">Quantity</label>
                    <br />
                    <div class="quantity buttons_added">
                      <input
                        type="button"
                        value="-"
                        class="minus"
                        onClick={handleQuantityDecrement}
                      />
                      <input
                        type="number"
                        step="1"
                        min="1"
                        max=""
                        onChange={handleQuantityChange}
                        name="quantity"
                        value={quantity}
                        title="Qty"
                        class="input-text qty text"
                        size="4"
                        pattern=""
                        inputmode=""
                      />
                      <input
                        type="button"
                        value="+"
                        onClick={handleQuantityIncrement}
                        class="plus"
                      />
                    </div>
                  </div>
                  <div class="contain-btn">
                    {user == null ? (
                      <button class="btn-addtocart" onClick={handleAddtocart}>
                        Add to cart
                      </button>
                    ) : (
                      <button
                        class="btn-addtocart"
                        onClick={handleAddToCartUser}
                      >
                        Add to cart
                      </button>
                    )}

                    <div class="blank-between"></div>
                    <button class="btn-buyitnow">Buy it now</button>
                  </div>

                  {/* <div class="current-view">
                  <span>Hiện tại có </span>
                  <div class="number-view">
                    <span>14</span>
                  </div>
                  <span> người đang xem sản phẩm này</span>
                </div>
                <div class="contain-description">
                  <span></span>
                </div>

                <div class="text-remain">
                  <span>Còn</span>
                  <span> 2 sản phẩm</span>
                </div> */}
                  <div class="social-info">
                    <span>Chia sẻ: </span>
                    <ul>
                      <li className="facebook">
                        <FacebookShareButton url={window.location.href} imageUrl={product.imgUrl} quote={product.tensp}>
                        
                          <i className="fa fa-facebook"></i>
                        </FacebookShareButton>
                      </li>
                      <li className="twitter">
                        <TwitterShareButton
                          url={window.location.href}
                          title={product.tensp}
                          hashtags={["vppphucuong", "vpp", "product"]}
                        >
                          <i className="fa-brands fa-twitter"></i>
                        </TwitterShareButton>
                      </li>
                      <li className="pinterest">
                        <PinterestShareButton
                          url={window.location.href}
                          media={product.img}
                          description={product.tensp}
                        >
                          <i className="fa-brands fa-pinterest"></i>
                        </PinterestShareButton>
                      </li>
                      <li className="whatsapp">
                        <WhatsappShareButton
                          url={window.location.href}
                          title={product.tensp}
                        >
                          <i className="fa-brands fa-whatsapp"></i>
                        </WhatsappShareButton>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="blank-between-5"></div>
              <div class="nav-tab-thuy">
                <ul class="nav nav-tabs d-flex justify-content-center">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      data-bs-toggle="tab"
                      href="#home"
                    >
                      Chi tiết sản phẩm
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" href="#menu1">
                      Đánh giá sản phẩm
                    </a>
                  </li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane container active" id="home">
                    <div
                      dangerouslySetInnerHTML={{ __html: product.mota_chinh }}
                    />
                  </div>
                  <div class="tab-pane container fade" id="menu1">
                    {paginaReview.map((re, index) => {
                      const content =
                        re.noidung.length > 255 && !showFullContent
                          ? `${re.noidung.substring(0, 255)} ...`
                          : re.noidung;
                          const isAdminReplied = re.reply !== null && re.reply !== "";
                      return (
                        <div id="reviewsMsg">
                          <div class="review">
                            <div class="profileImg">
                              <img
                                src="http://i.imgrpost.com/imgr/2017/09/04/001-man-2.png"
                                alt="001-man-2.png"
                                border="0"
                              />
                            </div>
                            <div class="desc">
                              <p
                                style={{
                                  color:
                                    user?.makh === re?.makh ? "red" : "#212529",
                                }}
                                className="tenkh"
                              >
                                {tenkhByMakh[index]?.tenkh}
                              </p>
                              <p style={{ width: "80%" }}>{content}</p>
                              {re.noidung.length > 255 && (
                                <button
                                  className="button-showmore"
                                  onClick={() =>
                                    setShowFullContent(!showFullContent)
                                  }
                                >
                                  {showFullContent ? "Rút gọn" : "Xem thêm"}
                                </button>
                              )}
                            </div>
                            <div class="persRating">
                              <Rating
                                name="read-only"
                                value={re.danhgia}
                                precision={0.5}
                                readOnly
                              />
                            </div>
                            <div className="xoa-review justify-content-end">
                              {user?.makh === re.makh ? (
                                <button
                                  className="del-btn-review"
                                  onClick={handleDeleteReview}
                                >
                                  Xóa
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                           
                          </div>
                          {isAdminReplied && (
          <div class="review">
          <div class="profileImg">
            <img
              src="http://i.imgrpost.com/imgr/2017/09/04/001-man-2.png"
              alt="001-man-2.png"
              border="0"
            />
          </div>
          <div class="desc">
            <p
              style={{
                color:
                  "red",
              }}
              className="tenkh"
            >
              VPP
            </p>
            <p style={{ width: "80%" }}>{content}</p>
            {re.reply.length > 255 && (
              <button
                className="button-showmore"
                onClick={() =>
                  setShowFullContent(!showFullContent)
                }
              >
                {showFullContent ? "Rút gọn" : "Xem thêm"}
              </button>
            )}
          </div>
          
          
         
        </div>
        )}
                          <div style={{ height: "20px" }}></div>
                        </div>
                      );
                    })}
                    {paginaReview.length == 0 ? (
                      <div></div>
                    ): (
                      <div className="">
                        <ul class="pagination justify-content-center">
                          <li
                            className={`page-item ${
                              currentPage !== fistIndex + 1 ? "" : "disabled"
                            }`}
                          >
                            <a
                              className={`page-link `}
                              style={{ cursor: "pointer" }}
                              onClick={prePage}
                            >
                              Previous
                            </a>
                          </li>

                          {numbers.map((n, i) => (
                            <li
                              class={`page-item ${
                                currentPage === n ? "active" : ""
                              }`}
                            >
                              <a
                                class="page-link"
                                style={{ cursor: "pointer" }}
                                onClick={() => changeCurrentPage(n)}
                              >
                                {n}
                              </a>
                            </li>
                          ))}
                          <li
                            className={`page-item ${
                              currentPage !== npage ? "" : "disabled"
                            }`}
                          >
                            <a
                              class="page-link"
                              style={{ cursor: "pointer" }}
                              onClick={nextPage}
                            >
                              Next
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                    
                    
                    {user ==null ? (
                      <div> lon dang nhap di r comment </div>
                    ):(
                      <div>
                      <div id="mid">
                        <h4>Nhận xét của bạn về sản phẩm của chúng tôi</h4>
                        {/* <input type="text"
                                                    value={comment}
                                                    onChange={(event) => {
                                                        const newValue = event.target.value;
                                                        setComment(newValue);
                                                    }} /><br /> */}
                        <br />
                        <textarea
                          rows="5"
                          cols="50"
                          className="comment"
                          value={comment}
                          onChange={(event) => {
                            const newValue = event.target.value;
                            setComment(newValue);
                          }}
                        ></textarea>
                        <div id="btn">
                          <Rating
                            value={rating}
                            onChange={(event, newValue) => {
                              setRating(newValue);
                            }}
                          />
                        </div>
                      </div>
                      <div id="foot">
                        <button onClick={handleDanhgiaClick}>Đánh giá</button>
                      </div>
                      <div style={{ height: "50px" }}></div>
                      
                    </div>
                    )}
                    
                  </div>
                </div>
              </div>
            </div>
            {currentProducts.length > 0 && (
              <section class="product-thuy" style={{ marginTop: "80px" }}>
                <div class="container">
                  <div class="row">
                    <div className="title-pro">
                      <h2>Các sản phẩm liên quan</h2>
                    </div>
                    {currentProducts.map((product) => (
                      <div class="col-lg-2 col-md-3 col-6 container-card">
                        <div style={{ position: "relative" }}>
                          {product.giacu && product.giacu > 0 ? (
                            <div className="sale">Sale</div>
                          ) : null}
                        </div>
                        <div class="img-product">
                          <Link
                            to={`/product/${product.url}`}
                            onClick={() => {
                              scroll.scrollToTop({
                                duration: 1,
                                smooth: true,
                              });
                            }}
                          >
                            <img
                              class="bottom-image"
                              src={product.img}
                              alt={product.tensp}
                            />
                          </Link>
                          {/* <a href={product.url}><img class="top-image" src={"/img/product/" + product.img_con} alt="" /></a> */}
                        </div>
                        <div class="more-button">
                          <div class="box">
                            <span>
                              <a style={{ cursor: "pointer" }}>
                                <Tooltip
                                  placement="left"
                                  overlay={<span>Quick View</span>}
                                >
                                  <i
                                    className="fa-solid fa-magnifying-glass"
                                    onClick={() => openModal(product)} // Open modal on click
                                  ></i>
                                </Tooltip>
                              </a>
                            </span>
                            <span>
                              <a style={{ cursor: "pointer" }}>
                                <Tooltip
                                  placement="left"
                                  overlay={<span>Wishlist</span>}
                                >
                                  <i class="fa-regular fa-heart"></i>
                                </Tooltip>
                              </a>
                            </span>
                            <span>
                              <a style={{ cursor: "pointer" }}>
                                <Tooltip
                                  placement="left"
                                  overlay={<span>Compare</span>}
                                >
                                  <i class="fa-solid fa-rotate-right"></i>
                                </Tooltip>
                              </a>
                            </span>
                            <span>
                              <a style={{ cursor: "pointer" }}>
                                <Tooltip
                                  placement="left"
                                  overlay={<span>Add to Cart</span>}
                                >
                                  <i class="fa-solid fa-cart-plus"></i>
                                </Tooltip>
                              </a>
                            </span>
                          </div>
                        </div>
                        <div class="product-info">
                          <div class="name-product ">
                            <Link
                              class="hover-underline-animation"
                              to={`/product/${product.url}`}
                              onClick={() => {
                                scroll.scrollToTop({
                                  duration: 1,
                                  smooth: true,
                                });
                              }}
                            >
                              {product.tensp}
                            </Link>
                          </div>
                          <div class="price-product">
                            {product.giacu && product.giacu > 0 ? (
                              <div style={{ fontSize: "15px" }}>
                                <del>
                                  <Currency value={product.giacu} />
                                </del>
                              </div>
                            ) : null}
                            <div
                              style={{
                                fontSize: "20px",
                                color: "red",
                                fontWeight: "bold",
                              }}
                            >
                              <Currency value={product.dongia} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div
                      className="pagination-wrapper"
                      style={{ textAlign: "center", marginTop: "20px" }}
                    >
                      <Pagination
                        current={currentPage}
                        pageSize={productsPerPage}
                        total={relatedProducts.length}
                        onChange={handlePageChange}
                      />
                    </div>
                  </div>
                </div>
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  contentLabel="Product Modal"
                >
                  {selectedProduct && (
                    <ModalContent
                      product={selectedProduct}
                      closeModal={closeModal}
                    />
                  )}
                </Modal>
              </section>
            )}
          </section>
        </main>
      </>
    );
  }
}
