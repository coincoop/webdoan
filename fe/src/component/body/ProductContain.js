import React from "react";
import "../../css/product.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import "rc-tooltip/assets/bootstrap.css";
import Tooltip from "rc-tooltip";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import Currency from "./Currency";
import { addProduct } from "../../redux/slice.js";
import { animateScroll as scroll } from "react-scroll";
import Rating from "@mui/material/Rating";
import Modal from "react-modal";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
export default function ProductContain(props) {
  const { product, selectedRating } = props;
  const quantity = 1;
  const handleAddtocart = () => {
    addProduct({ product, quantity });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const averageRating = () => {
    return (
      product.reviews.reduce((acc, item) => acc + item.danhgia, 0) /
      product.reviews.length
    );
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
    const averageRating = () => {
      if (product.reviews && product.reviews.length > 0) {
        return (
          product.reviews.reduce((acc, item) => acc + item.danhgia, 0) /
          product.reviews.length
        );
      } else {
        return 0;
      }
    };

    const handleAddToCart = () => {
      // Add logic to handle adding the product to the cart
    };
    if (selectedRating && product.rating !== selectedRating) {
      return null; // Không hiển thị sản phẩm nếu không trùng với số sao đánh giá đã chọn
    }
    return (
      <div class="modal fade" className="modal-content" id="myModal">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close btn-lg"
                onClick={closeModal}
              ></button>
            </div>

            <div class="modal-body">
              <div class="row">
                <div class="col-6">
                  <img
                    src={product.img}
                    alt=""
                    style={{ width: "100%", height: "300px" }}
                  />
                </div>
                <div class="col-6">
                  <h2>{product.tensp}</h2>
                  <p class="mota-modal">
                    <div dangerouslySetInnerHTML={{ __html: product.mota }} />
                  </p>
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
  return (
    <>
      <div class="col-lg-3 col-md-6 col-6 container-card">
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
            <img class="bottom-image" src={product.img} alt={product.tensp} />
          </Link>
        </div>
        <div class="more-button">
          <div class="box">
            <span>
              <a style={{ cursor: "pointer" }}>
                <Tooltip placement="left" overlay={<span>Quick View</span>}>
                  <i
                    className="fa-solid fa-magnifying-glass"
                    onClick={() => openModal(product)} // Open modal on click
                  ></i>
                </Tooltip>
              </a>
            </span>
            <span>
              <a style={{ cursor: "pointer" }}>
                <Tooltip placement="left" overlay={<span>Wishlist</span>}>
                  <i class="fa-regular fa-heart"></i>
                </Tooltip>
              </a>
            </span>
            <span>
              <a style={{ cursor: "pointer" }}>
                <Tooltip placement="left" overlay={<span>Compare</span>}>
                  <i class="fa-solid fa-rotate-right"></i>
                </Tooltip>
              </a>
            </span>
            <span>
              <a style={{ cursor: "pointer" }} onClick={handleAddtocart}>
                <Tooltip placement="left" overlay={<span>Add to Cart</span>}>
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
          <div class="star-review">
            {product.reviews && product.reviews.length > 0 ? (
              <>
                <Rating
                  name="read-only"
                  value={averageRating()}
                  precision={0.5}
                  readOnly
                />
                <span>({product.reviews.length} đánh giá)</span>
              </>
            ) : (
              <span>Chưa có đánh giá</span>
            )}
          </div>
          <div class="price-product">
            {product.giacu && product.giacu > 0 ? (
              <div style={{ fontSize: "15px" }}>
                <del>
                  <Currency value={product.giacu} />
                </del>
              </div>
            ) : null}
            <div style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}>
              <Currency value={product.dongia} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Product Modal"
      >
        {selectedProduct && (
          <ModalContent product={selectedProduct} closeModal={closeModal} />
        )}
      </Modal>
    </>
  );
}
