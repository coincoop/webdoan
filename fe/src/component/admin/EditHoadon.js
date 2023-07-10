import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { API_URL } from "../../config";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DataGrid } from '@mui/x-data-grid';

const EditReview = () => {
    const [mahd, setMahd] = useState("");
    const [makh, setMakh] = useState("");
    const [tongtien, setTongtien] = useState("");
    const [email, setEmail] = useState("");
    const [diachi, setDiachi] = useState("");
    const [sodienthoai, setSodienthoai] = useState("");
    const [tinhtrang, setTinhtrang] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
    useEffect(() => {
        getHoadonById();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${API_URL}admin/hoadon/${id}`,
                {
                    tongtien: tongtien,
                    email: email,
                    diachi: diachi,
                    sodienthoai: sodienthoai,
                    tinhtrang: tinhtrang,
                }
            );
            navigate("/admin");
           
        } catch (error) {
            console.log(error);
        }
    };

    const getHoadonById = async () => {
        const response = await axios.get(`${API_URL}admin/hoadon/${id}`);
        setMahd(response.data.mahd);
        setMakh(response.data.makh);
        setTongtien(response.data.tongtien);
        setEmail(response.data.email);
        setSodienthoai(response.data.sodienthoai);
        setTinhtrang(response.data.tinhtrang);
        setDiachi(response.data.diachi);
    };

    return (
        <div className="containeradmin">
            <Helmet>
                <title>{`Sửa Blog - Admin`}</title>
            </Helmet>
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Mã Hóa đơn</label>
                        <div>
                            <input
                                type="number"
                                placeholder="makh"
                                className="form-control"
                                value={mahd}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mã Khách hàng</label>
                        <div>
                            <input
                                type="number"
                                placeholder="masp"
                                className="form-control"
                                value={makh}
                                disabled
                            />
                        </div>
                    </div>
                   
                    <div className="mb-3">
                        <label className="form-label">Tổng tiền</label>
                        <div>
                            <input
                                type="number"
                                placeholder="Tongtien"
                                className="form-control"
                                value={tongtien}
                                onChange={(e) => setTongtien(e.target.value)}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <div>
                            <input
                                type="text"
                                placeholder="Email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Số điện thoại</label>
                        <div>
                            <input
                                type="text"
                                placeholder="sodienthoai"
                                className="form-control"
                                value={sodienthoai}
                                onChange={(e) => setSodienthoai(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Địa chỉ</label>
                        <div>
                            <input
                                type="text"
                                placeholder="sodienthoai"
                                className="form-control"
                                value={diachi}
                                onChange={(e) => setDiachi(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tình trạng đơn hàng</label>
                        <div>
                            <select
                                className="form-select"
                                value={tinhtrang}
                                onChange={(e) => setTinhtrang(e.target.value)}
                            >
                                <option value="0">Đang xác nhận đơn hàng</option>
                                <option value="1">Đang vận chuyển</option>
                                <option value="2">Đã hoàn thành</option>
                            </select>
                        </div>
                    </div>


                    <div style={{ textAlign: "center" }}>
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditReview;
