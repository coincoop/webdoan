import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Currency from "./body/Currency";
import "rc-tooltip/assets/bootstrap.css";
import Tooltip from "rc-tooltip";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "../css/category.css";
import "../css/product.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import { animateScroll as scroll } from "react-scroll";
import { API_URL } from "../config";
import Rating from "@mui/material/Rating";
import Modal from "react-modal";
import RangeSlider from "react-bootstrap-range-slider";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(null);
  const [filterPrice, setFilterPrice] = useState(maxPrice);
  const [value, setValue] = useState(0);
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
  const lastIndex = currentPage * recordsPerPage;
  const fistIndex = lastIndex - recordsPerPage;
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState([]);
  const { url } = useParams();
  const fetchProducts = async () => {
    const response = await axios.get(
      `${API_URL}categories/${url}`
    );
    await Promise.all(
      response.data.products.map(async (prod) => {
        if (prod.img) {
          const storageRef = ref(storage, `product/${prod.img}`);
          const imgUrl = await getDownloadURL(storageRef);
          prod.img = imgUrl;
        }
      })
    );
    setName(response.data.name);
    setProducts(response.data.products);
    setReview(response.data);
    console.log(response.data);
    console.log(url);
    console.log(response.data.name);
    const prices = response.data.products.map((p) => p.dongia);
    const tempMaxPrice = Math.max(...prices);
    setMaxPrice(tempMaxPrice);
    setFilterPrice(tempMaxPrice);
    setValue(tempMaxPrice);
    setIsLoading(false);
  };
  useEffect(() => {
    
    fetchProducts();
  }, [url]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handlePriceFilter = (e) => {
    setFilterPrice(e.target.value);
    setValue(e.target.value);
  };

  const handleRatingFilter = (rating) => {
    setSelectedRating(rating);
  };

  const handleSliderAfterChange = (value) => {
    console.log(value);
  };
  //
  const handleSortChange = (e) => {
    setSortValue(e.target.value);
  };
  //sort product
  const sortedProducts = () => {
    if (sortValue.includes("price")) {
      if (sortValue.includes("Asc")) {
        return products.sort((a, b) => parseInt(a.dongia) - parseInt(b.dongia));
      } else {
        return products.sort((a, b) => parseInt(b.dongia) - parseInt(a.dongia));
      }
    } else if (sortValue.includes("name")) {
      if (sortValue.includes("Asc")) {
        return products.sort((a, b) => a.tensp.localeCompare(b.tensp));
      } else {
        return products.sort((a, b) => b.tensp.localeCompare(a.tensp));
      }
    } else {
      return products;
    }
  };

  const numProducts = products.length;

  const filteredProducts = sortedProducts().filter((p) => {
    const averageRating = p.reviews.reduce(
      (acc, item) => acc + item.danhgia,
      0
    ) / p.reviews.length;
  
    if (selectedRating) {
      return averageRating >= parseInt(selectedRating) && parseInt(p.dongia) <= filterPrice;
    } else {
      return parseInt(p.dongia) <= filterPrice;
    }
  });
  
  

  const record = filteredProducts.slice(fistIndex, lastIndex);
  const npage = Math.ceil(filteredProducts.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== fistIndex + 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCurrentPage = (n) => {
    setCurrentPage(n);
  };
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
                class="btn-close btn-lg btn-modal"
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
   
    <section class="product-thuy">
      
      <div class="container">
      
      <div class="filter-contain">
            <div class="dropdown rangeslider block-filsort">
              <span>Chọn mức giá phù hợp: </span>
              <button
                type="button"
                class="dropdown-toggle btn-rangefilter"
                data-bs-toggle="dropdown"
              >
                Giá tiền từ
              </button>
              <ul class="dropdown-menu rangeslider-contain">
                <li>
                  {" "}
                  <RangeSlider
                    class="range-slider "
                    value={filterPrice}
                    onChange={handlePriceFilter}
                    min={0}
                    tooltip="false"
                    onAfterChange={handleSliderAfterChange}
                    max={maxPrice}
                  />
                </li>
                <li class="rangeslider-count">
                  <div style={{ marginLeft: "5%", marginRight: "50%" }}>
                    {" "}
                    <Currency value={0} />
                  </div>
                  <div style={{}}>
                    {" "}
                    <Currency value={value} />
                  </div>
                </li>
              </ul>
              <span className="ms-2">
                {" "}
                <Currency value={0} />
              </span>
              <span> - </span>
              <span>
                <Currency value={value} />
              </span>
            </div>
            <div class="block-filsort sort-contain">
              <span>Sắp xếp theo: </span>
              <div>
                <select value={sortValue} onChange={handleSortChange}>
                  <option value="">Chọn</option>
                  <option value="priceAsc">Giá: Tăng dần</option>
                  <option value="priceDesc">Giá: Giảm dần</option>
                  <option value="nameAsc">Tên: A - Z</option>
                  <option value="nameDesc">Tên: Z - A</option>
                </select>
              </div>
              <span> {numProducts} sản phẩm</span>
            </div>
          </div>
          <div className="block-filsort d-flex">
            <span>Đánh giá: </span>
            <div>
              <select
                value={selectedRating}
                onChange={(e) => handleRatingFilter(e.target.value)}
              >
                <option value="">Tất cả</option>
                <option value="5">5 sao</option>
                <option value="4">4 sao</option>
                <option value="3">3 sao</option>
                <option value="2">2 sao</option>
                <option value="1">1 sao</option>
              </select>
            </div>
          </div>
          {isLoading && <div className="load">
        <div class="loader" />
      </div>}
      {!isLoading && (
            <>
          {record.length > 0 ? (
        <div class="row">
          <h3 className="title-h3 text-center">{name}</h3>
          <Helmet>
            <title>{`${name} - Gaming Zone`}</title>
          </Helmet>
          
          {record.map((product) => (
            <div class="col-lg-2 col-md-4 col-6 container-card">
              <div style={{ position: "relative" }}>
                {product.giacu && product.giacu > 0 ? (
                  <div className="sale">Sale</div>
                ) : null}
              </div>
              <div class="img-product">
                <Link to={`/product/${product.url}`} onClick={() => {
                        scroll.scrollToTop({
                          duration: 1,
                          smooth: true,
                        });
                      }}>
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
                <div class="star-review">
                  {product.reviews && product.reviews.length > 0 ? (
                    <>
                      <Rating
                        name="read-only"
                        value={
                          product.reviews.reduce(
                            (acc, item) => acc + item.danhgia,
                            0
                          ) / product.reviews.length
                        }
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
        </div>
         ) : (
          <div className="load">
            <div>Hiện không có sản phẩm</div>
          </div>
        )}
         </>
      )}
      </div>
      <div style={{ height: `100px` }}></div>
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
              <li class={`page-item ${currentPage === n ? "active" : ""}`}>
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
              className={`page-item ${currentPage !== npage ? "" : "disabled"}`}
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
        
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Product Modal"
      >
        {selectedProduct && (
          <ModalContent product={selectedProduct} closeModal={closeModal} />
        )}
      </Modal>
     
    </section>
   
    </>
  );
}

export default CategoryPage;
