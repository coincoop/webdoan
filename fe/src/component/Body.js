import React from "react";
import ProductList from "./body/ProductList";
import Blogbody from "./body/Blogbody";
import SlideHeader from "./body/SlideHeader";
import ProductSlide from "./body/ProductSlide";
import Service from "./body/Service";
import CategoryProdHome from "./body/CategoryProdHome";

import CategorySale from "./body/CategorySale";
import PolicyBody from "./body/PolicyBody";
import PartnerSlider from "./body/Partner";
import { Helmet } from "react-helmet-async";

export default function Body() {
  return (
    <div>
      <Helmet>
        <title>Game Zone - Trang bán linh kiện máy tính</title>
      </Helmet>
      <SlideHeader />
      <Service />

      <ProductSlide />
      <CategoryProdHome />
      <CategorySale />
      <PolicyBody />
      <ProductList />

      <Blogbody />
      <PartnerSlider />

      {/* <Product /> */}
    </div>
  );
}
