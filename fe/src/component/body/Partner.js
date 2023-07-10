import React from "react";
import Slider from "react-slick";
import "../../css/partner.css";
import { API_URL } from "../../config";

export default function PartnerSlider() {
  const partnerSettings = {
    accessibility: false,
    arrows: false,
    dots: true,
    draggable: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const imgItems = [
    {
      id: 1,
      imageSrc: "img/home/acer.webp",
      alt: "Acer",
    },
    {
      id: 2,
      imageSrc: "img/home/amd.webp",
      alt: "AMD",
    },
    {
      id: 3,
      imageSrc: "img/home/asus.webp",
      alt: "Asus",
    },
    {
      id: 4,
      imageSrc: "img/home/cor.webp",
      alt: "Corsair",
    },
    {
      id: 5,
      imageSrc: "img/home/giga.webp",
      alt: "Gigabyte",
    },
  ];

  return (
    <div className="partner-slider">
      <h2>Đối tác của chúng tôi</h2>
      <Slider {...partnerSettings}>
        {imgItems.map((item) => (
          <div key={item.id} className="partner-slide">
            <img alt={item.alt} loading="lazy" src={item.imageSrc} />
            
          </div>
        ))}
      </Slider>
    </div>
  );
}
