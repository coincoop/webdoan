import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined,EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { API_URL } from "../../config";
import { getDownloadURL,ref } from "firebase/storage";
import { storage } from "../../firebase";
const ListMenu = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    try {
      const response = await axios.get(`${API_URL}admin/admenus`);
      const menus = response.data;
  
      // Lặp qua từng menu để lấy URL của hình từ Firebase Storage
      await Promise.all(
        menus.map(async (menu) => {
          if (menu.img) {
            const storageRef = ref(storage, `menu/${menu.img}`);
            const imgUrl = await getDownloadURL(storageRef);
            menu.img = imgUrl;
          }
        })
      );
  
      setMenus(menus);
    } catch (error) {
      console.log(error);
    }
  };
  

  const deleteMenu = async (id) => {
    try {
      await axios.delete(`${API_URL}admin/admenus/${id}`);
      getMenus();
    } catch (error) {
      console.log(error);
    }
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
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
            onClick={() => clearFilters && handleReset(clearFilters)}
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
    },
    {
      title: "Tên menu",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.localeCompare(b.name), // So sánh chuỗi tên menu
      sortDirections: ["ascend", "descend"], // Đảo ngược thứ tự sắp xếp
    },
    {
      title: "Menu cha",
      dataIndex: "parent_id",
      key: "parent_id",
      ...getColumnSearchProps("parent_id"),
      sorter: (a, b) => a.parent_id - b.parent_id,
      sortDirections: ["ascend", "descend"], // Đảo ngược thứ tự sắp xếp
    },
    {
      title: "Hình",
      dataIndex: "img",
      key: "img",
      render: (img) => <img src={img} width={100} alt="" />,
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
     
      render: (_, menu) => (
        <Space>
          <Link to={`edit/${menu.id}`}>
            <Button
              type="primary"
              size="large"
              icon={<EditOutlined />}
            ></Button>
          </Link>

          <Button
            type="primary"
            danger
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => deleteMenu(menu.id)}
          ></Button>
        </Space>
      ),
      fixed: "right",
      width: 120,
    },
  ];

  return (
    <div>
      <Link to={`addmenu`} className="btn btn-primary mb-2">
        Thêm Menu
      </Link>

      <Table columns={columns} dataSource={menus} pagination={true} bordered/>
    </div>
  );
};

export default ListMenu;
