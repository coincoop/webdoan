import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/productslide.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Currency from "./Currency";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { animateScroll as scroll } from "react-scroll";
import { API_URL } from "../../config";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
const ProductSlide = () => {
  const [products, setProducts] = useState([]);
  const fetchProduct = async () => {
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
  useEffect(() => {
    
    fetchProduct();
  }, []);
  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <FaAngleLeft />
      </div>
    );
  };

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <FaAngleRight />
      </div>
    );
  };
  const settings = {
    swipeToSlide: true,
    accessibility: false,
    arrows: true,
    dots: true,
    infinite: true,
    autoplay: true,
    draggable: true,
    autoplaySpeed: 2000,
    speed: 400,
    slidesToShow: 7,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
    vertical: false,
    mobileFirst: false,
    pauseOnHover: false,
    rows: 1,
    slidesPerRow: 1,
    rtl: 0,
  };
  AOS.init({
    // Các tùy chọn của AOS
  });
  return (
    <div data-aos="fade-up" className="container">

    
    <div  className="container-slide-pro">
      <div className="title-pro">
        <h2 className="titlenew">Sản phẩm tiêu biểu</h2>
        <Link to={`/product`} onClick={() => {
                scroll.scrollToTop({
                  duration: 1,
                  smooth: true,
                });
              }} className="morenew">Xem thêm</Link>
      </div>
      <Slider {...settings}>
        {products.slice(0, 12).map((product) => (
          <div key={product.id} className="product-slide-item">
            <Link
              to={`/product/${product.url}`}
              onClick={() => {
                scroll.scrollToTop({
                  duration: 1,
                  smooth: true,
                });
              }}
            >
              <div style={{ position: "relative" }}>
                    {product.giacu && product.giacu > 0 ? (
                      <div className="sale">Sale</div>
                    ) : null}
                  </div>
              <img src={product.img} alt={product.tensp} />
              <div className="product-slide-name" title={product.tensp}>
                {product.tensp}
              </div>
            </Link>
            <div className="product-slide-price">
            {product.giacu && product.giacu > 0 ? (
              <div style={{ fontSize: "15px", color:"#4d4d4d"}}>
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
        ))}
      </Slider>
    </div>
    </div>
  );
};

export default ProductSlide;
