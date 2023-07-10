
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import Product from './component/Product';
import Footer from './component/Footer';
import Header from './component/Header';
import Login from './component/Login';
import Body from './component/Body';
import Detail from './component/Detail';
import CategoryPage from "./component/CategoryPage";
import Product from "./component/Product";
import SearchResults from "./component/SearchResult";
import Register from "./component/Register";
import Cart from "./component/Cart";
import AccountUser from "./component/AccountUser";
import AccountCart from "./component/AccountCart";
import Blog from "./component/Blog";
import ProductSale from "./component/ProductSale";
import Contact from "./component/Contact";
import NotFound from "./component/NotFound";
import AccountEdit from "./component/AccountEdit";
//Admin
import AddMenu from "./component/admin/AddMenu";
import EditMenu from "./component/admin/EditMenu";
// import MenuList from "./component/admin/MenuList";
// import ProductList from "./component/admin/ProductList";
import AddProduct from "./component/admin/AddProduct";
import EditProduct from "./component/admin/EditProduct";
import AdLayout from "./component/admin/AdLayout";
import AddHome from "./component/admin/AddHome";
import EditHome from "./component/admin/EditHome";
import AddBlog from "./component/admin/AddBlog";
import EditBlog from "./component/admin/EditBlog";
import AddCateProd from "./component/admin/AddCateProd"
import EditCateProd from "./component/admin/EditCateProd";
import EditReview from "./component/admin/EditReview";
import EditHoadon from "./component/admin/EditHoadon";
import AddContact from "./component/admin/AddContact";
import EditContact from "./component/admin/EditContact";
import BlogAll from "./component/BlogAll"
import Payment from "./component/Payment"
import ForgotPassword from "./component/ForgotPassword";
import NextStep from "./component/nextStepFP"
import EditCThoadon from "./component/admin/EditCThoadon";
import { useSelector } from "react-redux";

import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  const user = useSelector((state) => state.user.login.currentUser);
  const accessToken = user?.accessToken;
  const vaitro = user?.vaitro
  if (vaitro == 0 || user == null) {
    return <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Body /></Layout>} />
          <Route path="/product" element={<Layout><Product /></Layout>} />
          <Route path="/productsale" element={<Layout><ProductSale /></Layout>} />
          <Route path="/account/login" element={<Layout><Login /></Layout>} />
          <Route path="/account/register" element={<Layout><Register /></Layout>} />
          <Route path="product/:url" element={<Layout><Detail /></Layout>} />
          <Route path="/categories/:url" element={<Layout><CategoryPage /></Layout>} />
          <Route path="/search/:searchText" element={<Layout><SearchResults /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/blog/:url" element={<Layout><Blog /></Layout>} />
          <Route path="/account/logout" element={<Layout></Layout>} />
          <Route path="/lienhe" element={<Layout><Contact /></Layout>} />
          <Route path="/account" element={<Navigate to="/account/user" replace />} />
          <Route path="/account/user" element={<Layout><AccountUser /></Layout>} />
          <Route path="/account/cart" element={<Layout><AccountCart /></Layout>} />
          <Route path="/account/edit" element={<Layout><AccountEdit /></Layout>} />
          <Route path="/blog" element={<Layout><BlogAll /></Layout>} />
          <Route path="/payment" element={<Layout><Payment /></Layout>} />
          <Route path="/account/forgot-pass" element={<Layout><ForgotPassword /></Layout>} />
          <Route path="/account/:email" element={<Layout><NextStep /></Layout>} /> 

          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>

      </BrowserRouter>
    </div>
  } else {
    return (
      <>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Layout><Body /></Layout>} />
            <Route path="/product" element={<Layout><Product /></Layout>} />
            <Route path="/productsale" element={<Layout><ProductSale /></Layout>} />
            <Route path="/account/login" element={<Layout><Login /></Layout>} />
            <Route path="/account/logout" element={<Layout></Layout>} />
            <Route path="/account/register" element={<Layout><Register /></Layout>} />
            <Route path="product/:url" element={<Layout><Detail /></Layout>} />
            <Route path="/:url" element={<Layout><CategoryPage /></Layout>} />
            <Route path="/search/:searchText" element={<Layout><SearchResults /></Layout>} />
            <Route path="/cart" element={<Layout><Cart /></Layout>} />
            <Route path="/blog/:url" element={<Layout><Blog /></Layout>} />
            <Route path="/lienhe" element={<Layout><Contact /></Layout>} />
            <Route path="/account" element={<Navigate to="/account/user" replace />} />
            <Route path="/account/user" element={<Layout><AccountUser /></Layout>} />
            <Route path="/account/cart" element={<Layout><AccountCart /></Layout>} />
            <Route path="/account/edit" element={<Layout><AccountEdit /></Layout>} />
            <Route path="/payment" element={<Layout><Payment /></Layout>} />
            <Route path="/blog" element={<Layout><BlogAll /></Layout>} />
            <Route path="/account/forgot-pass" element={<Layout><ForgotPassword /></Layout>} />
            <Route path="/account/:email" element={<Layout><NextStep /></Layout>} />
            {/* <Route path="/products/:id" element={<Product />} />
          <Route path="/admin" element={<ProductList />} /> */}
            {/* <Route path="/login" element={<Login />} />
          <Route index element={<Body />} /> */}
            {/* <Route path="add" element={<AddProduct />} />
          <Route path="/admin/edit/:id" element={<EditProduct />} /> */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
            <Route path="/admin" element={<AdLayout />}></Route>
            {/* <Route path="/product" element={<ProductList/>} />
          <Route path="/menu" element={<MenuList/>} /> */}
            <Route path="/admin/addmenu" element={<AddMenu />} />
            <Route path="/admin/addproduct" element={<AddProduct />} />
            <Route path="/admin/edit/:id" element={<EditMenu />} />
            <Route path="/admin/editproduct/:id" element={<EditProduct />} />
            <Route path="/admin/addhome" element={<AddHome />} />
            <Route path="/admin/edithome/:id" element={<EditHome />} />
            <Route path="/admin/addContact" element={<AddContact />} />
            <Route path="/admin/editContact/:id" element={<EditContact />} />
            {/* <Route path="/edithome/:id" element={<EditHome />} /> */}
            <Route path="/admin/addblog" element={<AddBlog />} />
            <Route path="/admin/editblog/:idblog" element={<EditBlog />} />
            <Route path="/admin/addCateProd" element={<AddCateProd />} />
            <Route path="/admin/editCateProd/:id" element={<EditCateProd />} />
            {/* <Route path="/addReview" element={<AddReview />} /> */}
            <Route path="/admin/editReview/:id" element={<EditReview />} />
            <Route path="/admin/editHoadon/:id" element={<EditHoadon />} />
            <Route path="/admin/editCTHoadon/:id/:idsp" element={<EditCThoadon />} />
            
          </Routes>
        </BrowserRouter>

      </>
    );
  }
}

export default App;