import {
  AppstoreOutlined,
  MenuOutlined,
  InboxOutlined,
  BookOutlined,
  SkinOutlined,
  FileTextOutlined,
  FileOutlined,
  SmileOutlined,
  PhoneOutlined, FundProjectionScreenOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import ListProduct from "./ListProduct";
import ListMenu from "./ListMenu";
import ListHome from "./ListHome";
import ListBlog from "./ListBlog";
import ListCateProd from "./ListCateProd";
import ListReview from "./ListReview";
import ListContact from "./ListContact";
import "../../css/AdLayout.css";
import Dashboard from "./Dashboard";
import ListHoadon from "./ListHoadon";
import ListCTHD from "./ListCTHD";
import { Helmet } from "react-helmet";

const { Header, Content, Footer, Sider } = Layout;
const AdLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedMenuItem, setSelectedMenuItem] = useState("1"); // 1 là key của item "Product" trong menu

  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem.key);
  };

  return (
    <Layout>
      <Helmet>
        <title>{`Admin`}</title>
      </Helmet>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedMenuItem]}
          onClick={handleMenuClick}
          items={[
            { key: "1", icon: <FundProjectionScreenOutlined />, label: "Tổng quan" },
            { key: "2", icon: <InboxOutlined />, label: "Sản phẩm" },
            { key: "3", icon: <MenuOutlined />, label: "Menu" },
            { key: "4", icon: <SkinOutlined />, label: "Chủ đề" },
            { key: "5", icon: <BookOutlined />, label: "Blog" },
            { key: "6", icon: <AppstoreOutlined />, label: "Phân loại" },
            { key: "7", icon: <SmileOutlined />, label: "Đánh giá" },
            { key: "8", icon: <PhoneOutlined />, label: "Liên hệ" },
            { key: "9", icon: <FileOutlined />, label: "Hóa đơn" },
            { key: "10", icon: <FileTextOutlined />, label: "Chi tiết Hóa đơn" },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="horizontal"
            onClick={handleMenuClick}
            selectedKeys={[selectedMenuItem]}
            items={[
              { key: "1", label: "Tổng quan" },
              { key: "2", label: "Sản phẩm" },
              { key: "3", label: "Menu" },
              { key: "4", label: "Chủ đề" },
              { key: "5", label: "Blog" },
              { key: "6", label: "Phân loại" },
              { key: "7", label: "Đánh giá" },
              { key: "8", label: "Liên hệ" },
              { key: "9", label: "Hóa đơn" },
              { key: "10", label: "Chi tiết Hóa đơn" },
            ]}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          {selectedMenuItem === "1" ? (
            <Dashboard />
          ) : selectedMenuItem === "2" ? (
            <ListProduct />
          ) : selectedMenuItem === "3" ? (
            <ListMenu />
          ) : selectedMenuItem === "4" ? (
            <ListHome />
          ) : selectedMenuItem === "5" ? (
            <ListBlog />
          ) : selectedMenuItem === "6" ? (
            <ListCateProd />
          ) : selectedMenuItem === "7" ? (
            <ListReview />
          ) : selectedMenuItem === "8" ? (
            <ListContact />
          ) : selectedMenuItem === "9" ? (
            <ListHoadon />
          ) : selectedMenuItem === "10" ? (
            <ListCTHD />
          ) : null}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          GameZone
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdLayout;
