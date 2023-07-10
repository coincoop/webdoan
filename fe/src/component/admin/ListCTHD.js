import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { API_URL } from "../../config";
import { DataGrid } from '@mui/x-data-grid';
import "../../css/pagmui.css"

const ListReview = () => {
  const [cthoadon, setCTHoadon] = useState([]);

  useEffect(() => {
    getCTHoadon();
  }, []);
  
  const getCTHoadon = async () => {
    try {
      const response = await axios.get(`${API_URL}admin/cthoadons/all`);
      setCTHoadon(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  

  const columns = [
    { field: 'mahd', headerName: 'Mã hóa đơn', width: 130 },
    { field: 'masp', headerName: 'Mã sản phẩm', width: 130 },
    { field: 'soluong', type: 'number', headerName: 'Số lượng', width: 130 },
    {
      field: 'dongia',
      headerName: 'Đơn giá',
      type: 'number',
      width: 250,
    },
    { field: 'tongtien',type: 'number', headerName: 'Tổng tiền', width: 200},
    { field: "tinhtrang", headerName: "Tình trạng", width: 130, valueGetter: (params) => getTinhTrang(params.row.tinhtrang) },
   
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
      
        <div>
          <Link to={`/admin/editCTHoadon/${params.row.mahd}/${params.row.masp}`}>
            <EditOutlined style={{ marginRight: 8 }} />
          </Link>
          
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(params.row.mahd,params.row.masp)}
          />
        </div>
      ),
    },
  ];

  const handleDelete = async (id,masp) => {
    try {
      await axios.delete(`${API_URL}admin/cthoadon/${id}/${masp}`);
      getCTHoadon();
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
        rows={cthoadon}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        getRowId={(row) => `${row.mahd}-${row.masp}`} 
      />
    </div>
  );

};

export default ListReview;
