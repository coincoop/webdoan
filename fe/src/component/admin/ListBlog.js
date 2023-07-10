import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Input, Button, Space,Tooltip } from "antd";
import { SearchOutlined,EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../css/menulist.css"
import Highlighter from "react-highlight-words";
import { API_URL } from "../../config";
import { getDownloadURL,ref } from "firebase/storage";
import { storage } from "../../firebase";
const ListBlog = () => {
  const [blogs, setBlog] = useState([]);

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    const response = await axios.get(`${API_URL}admin/blog`);
    const blogs = response.data;
    await Promise.all(
      blogs.map(async (blog) => {
        if (blog.img_blog) {
          const storageRef = ref(storage, `blog/${blog.img_blog}`);
          const imgUrl = await getDownloadURL(storageRef);
          blog.img_blog = imgUrl;
        }
      })
    );
    setBlog(blogs);
  };

  const deleteBlog = async (id) => {
    try {
     await axios.delete(`${API_URL}admin/blog/${id}`); 
     
      getBlog(blogs);
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
      title: "IdBlog",
      dataIndex: "idblog",
      key: "idblog",
      sorter: (a, b) => a.idblog - b.idblog,
      sortDirections: ["ascend", "descend"], 
      width: 80,// Đảo ngược thứ tự sắp xếp
    },
    {
      title: "Tên blog",
      dataIndex: "tenblog",
      key: "tenblog",
      ...getColumnSearchProps("tenblog"),
      sorter: (a, b) => a.tenblog.localeCompare(b.tenblog), // So sánh chuỗi tên menu
      sortDirections: ["ascend", "descend"], // Đảo ngược thứ tự sắp xếp
    },
    {
      title: "Mô tả",
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
      title: "Hình chính",
      dataIndex: "img_blog",
      key: "img_blog",
      render: (img_blog) => <img src={img_blog} width={100} alt="" />,
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
     
      render: (_, blog) => (
        <Space>
          <Link to={`editblog/${blog.idblog}`}>
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
            onClick={() => deleteBlog(blog.idblog)}
          ></Button>
        </Space>
      ),
      fixed: "right",
      width: 120,
    },
  ];

  return (
    <div>
      <Link to={`addblog`} className="btn btn-primary mb-2">
        Thêm Blog
      </Link>

      <Table columns={columns} dataSource={blogs} pagination={true} bordered/>
    </div>
  );
};

export default ListBlog;
