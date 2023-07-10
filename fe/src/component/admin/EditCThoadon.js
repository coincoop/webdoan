import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { API_URL } from "../../config";


const EditReview = () => {
    const [mahd, setMahd] = useState("");
    const [masp, setMasp] = useState("");
    const [soluong, setSoluong] = useState("");
    const [dongia, setDongia] = useState("");
    const [tongtien, setTongtien] = useState("");
    const [tinhtrang, setTinhtrang] = useState("");
    const navigate = useNavigate();
    const { id , idsp } = useParams();
    console.log(id);
    useEffect(() => {
        getHoadonById();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${API_URL}admin/cthoadon/${id}/${idsp}`,
                {
                    masp : masp,
                    soluong : soluong,
                    dongia : dongia,
                    tongtien : tongtien,
                    tinhtrang :tinhtrang,
                }
            );
            navigate("/admin");
        } catch (error) {
            console.log(error);
        }
    };

    const getHoadonById = async () => {
        const response = await axios.get(`${API_URL}admin/cthoadon/${id}/${idsp}`);
        setMahd(response.data.mahd);
        setMasp(response.data.masp);
        setTongtien(response.data.tongtien);
        setDongia(response.data.dongia);
        setSoluong(response.data.soluong);
        setTinhtrang(response.data.tinhtrang);
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
                        <label className="form-label">Mã Sản phẩm</label>
                        <div>
                            <input
                                type="number"
                                placeholder="masp"
                                className="form-control"
                                value={masp}
                                onChange={(e) => setMasp(e.target.value)}
                            />
                        </div>
                    </div>
                   
                    <div className="mb-3">
                        <label className="form-label">Số lượng</label>
                        <div>
                            <input
                                type="number"
                                placeholder="Tongtien"
                                className="form-control"
                                value={soluong}
                                onChange={(e) => setSoluong(e.target.value)}
                                
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Đơn giá</label>
                        <div>
                            <input
                                type="text"
                                placeholder="Email"
                                className="form-control"
                                value={dongia}
                                onChange={(e) => setDongia(e.target.value)}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tổng tiền</label>
                        <div>
                            <input
                                type="text"
                                placeholder="sodienthoai"
                                className="form-control"
                                value={tongtien}
                                onChange={(e) => setTongtien(e.target.value)}
                                disabled
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
                                disabled
                            >
                                <option value="0">Đang xác nhận đơn hàng</option>
                                <option value="1">Đang vận chuyển</option>
                                <option value="2">Đã hoàng thành</option>
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
