import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Switch, Button,Space,Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { API_URL } from "../../config";
const ListContact = () => {
  const [contact, setContact] = useState([]);

  useEffect(() => {
    getContact();
  }, []);

  const getContact = async () => {
    try {
      const response = await axios.get(`${API_URL}admin/contact`);
      setContact(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API_URL}admin/contact/${id}`);
      getContact();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      await axios.put(`${API_URL}admin/contact/${id}`, {
        status: newStatus,
      });
      getContact();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Kích hoạt",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Switch
          checked={record.status === 1}
          onChange={() => updateStatus(record.id, record.status)}
        />
      ),
      fixed: "left",
      width: 100,
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
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
      width: 130,
    },
    {
      title: "Địa chỉ",
      dataIndex: "diachi",
      key: "diachi",
      width: 150,
    },
    {
      title: "Gmail",
      dataIndex: "gmail",
      key: "gmail",
      width: 130,
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      width: 150,
    },
    {
      title: "Google map",
      dataIndex: "map",
      key: "map",
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (map) => (
        <Tooltip placement="topLeft" title={map}>
          {map}
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      
      render: (_, record) => (
        <Space>
          <Link to={`editContact/${record.id}`}>
            <Button type="primary"
              size="large" icon={<EditOutlined />} />
          </Link>
          <Button
            type="primary"
            size="large"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteContact(record.id)}
          />
        </Space>
      ),
      fixed: "right",
      width: 120,
    },
  ];

  return (
   
      <div style={{height: "100vh"}}>
        <Link to={`addContact`} className="btn btn-primary mb-2">
          Thêm mới
        </Link>
        <Table columns={columns} dataSource={contact} pagination={false} bordered scroll={{
          x: 1000,
          y: "100vh",
        }}/>
      </div>
 
  );
};

export default ListContact;
