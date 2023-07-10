import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Input, Button, Space, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Currency from "./Currency";
import { API_URL } from "../../config";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
const ListProduct = () => {
  const [products, setProductsss] = useState([]);
  const [visible, setVisible] = useState(products.visible);
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    setVisible(products.visible);
  }, [products.visible]);
  const getProducts = async () => {
    const response = await axios.get(`${API_URL}admin/adproducts`);
    const prod = response.data;
    await Promise.all(
      prod.map(async (prod) => {
        if (prod.img) {
          const storageRef = ref(storage, `product/${prod.img}`);
          const imgUrl = await getDownloadURL(storageRef);
          prod.img = imgUrl;
        }
      })
    );
    setProductsss(prod);
  };
  const updateStatusProd = async (productId) => {
    try {
      const productToUpdate = products.find((product) => product.id === productId);
      if (!productToUpdate) {
        console.log("Product not found");
        return;
      }
  
      const newStatus = productToUpdate.visible ? 0 : 1;
      await axios.put(`${API_URL}admin/adproducts/${productId}`, {
        visible: newStatus,
      });
  
      // Cập nhật lại giá trị visible trong sản phẩm tương ứng trong danh sách products
      const updatedProducts = products.map((product) =>
        product.id === productId ? { ...product, visible: newStatus } : product
      );
      setProductsss(updatedProducts);
      getProducts(); // Tải lại danh sách sản phẩm sau khi thay đổi
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}admin/adproducts/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [searchedProducts, setSearchedProducts] = useState([]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText("");
    setSearchedColumn("");
  };
  const handleSearchOutside = (value) => {
    const filteredProducts = products.filter((product) =>
      product.tensp.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedProducts(filteredProducts);
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => confirm && handleReset(clearFilters, confirm)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["ascend", "descend"], // Đảo ngược thứ tự sắp xếp
      fixed: "left",
      width: 50,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "tensp",
      key: "tensp",
      ...getColumnSearchProps("tensp"),
      sorter: (a, b) => a.tensp.localeCompare(b.tensp), // So sánh chuỗi tên menu
      sortDirections: ["ascend", "descend"], // Đảo ngược thứ tự sắp xếp
      fixed: "left",
      width: 150,
    },
    {
      title: "Mô tả ngắn",
      dataIndex: "mota",
      key: "mota",
      ellipsis: {
        showTitle: false,
      },
      render: (mota) => (
        <Tooltip placement="topLeft" title={mota}>
          {mota}
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: "Mô tả chi tiết",
      dataIndex: "mota_chinh",
      key: "mota_chinh",
      ellipsis: {
        showTitle: false,
      },
      render: (mota_chinh) => (
        <Tooltip placement="topLeft" title={mota_chinh}>
          {mota_chinh}
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: "Giá cũ",
      dataIndex: "giacu",
      key: "giacu",
      ...getColumnSearchProps("giacu"),
      sorter: (a, b) => a.giacu - b.giacu,
      sortDirections: ["ascend", "descend"],
      width: 125,
      render: (giacu) => (
        <div style={{ textAlign: "right" }}>
          <Currency value={giacu} />
        </div>
      ),
    },
    {
      title: "Giá mới",
      dataIndex: "dongia",
      key: "dongia",
      ...getColumnSearchProps("dongia"),
      sorter: (a, b) => a.dongia - b.dongia,
      sortDirections: ["ascend", "descend"],
      width: 125,
      render: (dongia) => (
        <div style={{ textAlign: "right" }}>
          <Currency value={dongia} />
        </div>
      ),
    },
    {
      title: "Hình",
      dataIndex: "img",
      key: "img",
      render: (img) => (
        <img style={{ textAlign: "center" }} src={img} width={50} alt="" />
      ),
      width: 90,
      height: 90,
    },
    {
      title: "Menu cấp 1",
      dataIndex: "id_loailon",
      key: "id_loailon",
      ...getColumnSearchProps("id_loailon"),
      sorter: (a, b) => a.id_loailon - b.id_loailon,
      sortDirections: ["ascend", "descend"], // Đảo ngược thứ tự sắp xếp
      width: 125,
      render: (id_loailon) => (
        <div style={{ textAlign: "right" }}>{id_loailon}</div>
      ),
    },
    {
      title: "Menu Cấp 2",
      dataIndex: "id_loai",
      key: "id_loai",
      ...getColumnSearchProps("id_loai"),
      sorter: (a, b) => a.id_loai - b.id_loai,
      sortDirections: ["ascend", "descend"], // Đảo ngược thứ tự sắp xếp
      width: 125,
      render: (id_loai) => <div style={{ textAlign: "right" }}>{id_loai}</div>,
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
      ...getColumnSearchProps("color"),
    },
    {
      title: "Đơn vị tính",
      dataIndex: "donvitinh",
      key: "donvitinh",
      ...getColumnSearchProps("donvitinh"),
    },
    {
      title: "Định lượng",
      dataIndex: "dinhluong",
      key: "dinhluong",
      ...getColumnSearchProps("dinhluong"),
    },
    {
      title: "Chất liệu",
      dataIndex: "chatlieu",
      key: "chatlieu",
      ...getColumnSearchProps("chatlieu"),
    },
    {
      title: "Đóng gói",
      dataIndex: "donggoi",
      key: "donggoi",
      ...getColumnSearchProps("donggoi"),
    },
    {
      title: "Khổ giấy",
      dataIndex: "khogiay",
      key: "khogiay",
      ...getColumnSearchProps("khogiay"),
    },
    {
      title: "Xuất xứ",
      dataIndex: "xuatxu",
      key: "xuatxu",
      ...getColumnSearchProps("xuatxu"),
    },
    {
      title: "Kích thước",
      dataIndex: "kichthuoc",
      key: "kichthuoc",
      ...getColumnSearchProps("kichthuoc"),
    },
    {
      title: "Thương hiệu",
      dataIndex: "thuonghieu",
      key: "thuonghieu",
      ...getColumnSearchProps("thuonghieu"),
    },
    {
      title: "Thể tích",
      dataIndex: "thetich",
      key: "thetich",
      ...getColumnSearchProps("thetich"),
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Tình trạng",
      dataIndex: "visible",
      key: "visible",
      ...getColumnSearchProps("visible"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, product) => (
        <Space>
          <Link to={`editproduct/${product.id}`}>
            <Button
              type="primary"
              size="large"
              className="ant-btn"
              icon={<EditOutlined />}
            ></Button>
          </Link>

          <Button
            type="primary"
            danger
            className="ant-btn"
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => deleteProduct(product.id)}
          ></Button>

<Button
  type="primary"
  danger
  className="ant-btn"
  size="large"
  icon={visible === 0 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
  onClick={() => updateStatusProd(product.id)}
></Button>
        </Space>
      ),
      fixed: "right",
      width: 180,
    },
  ];
  return (
    <div className="">
      <Link to={`addproduct`} className="btn btn-primary mb-2">
        Thêm sản phẩm
      </Link>
      <Input.Search
        placeholder="Tìm kiếm sản phẩm"
        allowClear
        enterButton
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onSearch={() => {
          handleSearchOutside(searchText);
        }}
        style={{ width: 300, marginLeft: 10, marginTop: 4 }}
      />

      <Table
        columns={columns}
        dataSource={searchedProducts.length > 0 ? searchedProducts : products}
        pagination={{
          position: "bottomCenter",
        }}
        bordered
        scroll={{
          x: 3000,
          y: "100vh",
        }}
      />
    </div>
  );
};

export default ListProduct;
