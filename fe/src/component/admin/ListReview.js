import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Button,Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { API_URL } from "../../config";
const ListReview = () => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    getReview();
  }, []);

  const getReview = async () => {
    try {
      const response = await axios.get(`${API_URL}admin/review`);
      setReview(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReview = async (makh, masp) => {
    try {
      await axios.delete(`${API_URL}admin/review/${makh}&${masp}`);
      getReview();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Mã khách hàng",
      dataIndex: "makh",
      key: "makh",
      width: 120,
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "masp",
      key: "masp",
      width: 120,
    },
    {
      title: "Đánh giá",
      dataIndex: "danhgia",
      key: "danhgia",
     
      width: 120,
    },
    {
      title: "Nội dung",
      dataIndex: "noidung",
      key: "noidung",
      width: 150,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      
      render: (_, record) => (
        <Space>
          <Link to={`editReview/${record.makh}`}>
            <Button type="primary"
              size="large" icon={<EditOutlined />} />
          </Link>
          <Button
            type="primary"
            size="large"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteReview(record.makh,record.masp)}
          />
        </Space>
      ),
      fixed: "right",
      width: 120,
    },
  ];

  return (
   
      <div style={{height: "100vh"}}>
        <Link to={`addReview`} className="btn btn-primary mb-2">
          Thêm mới
        </Link>
        <Table columns={columns} dataSource={review} pagination={false} bordered scroll={{
          x: 1000,
          y: "100vh",
        }}/>
      </div>
 
  );
};

export default ListReview;
