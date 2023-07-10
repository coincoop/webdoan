import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { API_URL } from "../../config";
import { DataGrid } from '@mui/x-data-grid';
import "../../css/pagmui.css"
const ListReview = () => {
  const [hoadon, setHoadon] = useState([]);

  useEffect(() => {
    getHoadon();
  }, []);

  const getHoadon = async () => {
    try {
      const response = await axios.get(`${API_URL}admin/hoadon`);
      setHoadon(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: 'mahd', headerName: 'Mã hóa đơn', width: 130 },
    { field: 'makh', headerName: 'Mã khách hàng', width: 130 },
    { field: 'tongtien', type: 'number', headerName: 'Tổng tiền', width: 130 },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: true
    },
    { field: 'diachi', headerName: 'Địa chỉ', width: 200, editable: true },
    { field: 'sodienthoai', headerName: 'Số điện thoại', width: 130, editable: true },
    { field: "tinhtrang", headerName: "Tình trạng", width: 130, valueGetter: (params) => getTinhTrang(params.row.tinhtrang) },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <Link to={`/admin/editHoadon/${params.id}`}>
            <EditOutlined style={{ marginRight: 8 }} />
          </Link>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(params.id)}
          />
        </div>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}admin/hoadon/${id}`);
      getHoadon();
    } catch (error) {
      console.log(error);
    }
  }

  const getTinhTrang = (tinhTrang) => {
    if (tinhTrang == 0) {
      return "Đang xác nhận";
    } else if (tinhTrang == 1) {
      return "Đang giao";
    } else if (tinhTrang == 2) {
      return "Hoàn thành";
    }
    return "sai kìa";
  };

  return (
    <div style={{ height: '83.8vh', width: '100%' }}>
      <DataGrid
        rows={hoadon}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        getRowId={(row) => row.mahd}
       
      />
    </div>
  );

};

export default ListReview;
