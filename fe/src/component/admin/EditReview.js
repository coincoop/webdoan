import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { API_URL } from "../../config";
const EditReview = () => {
  const [makh, setMakh] = useState("");
  const [masp, setMasp] = useState("");
  const [danhgia, setDanhgia] = useState("");
  const [noidung, setNoidung] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    getReviewById();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("makh", makh);
    formData.append("masp", masp);
    formData.append("danhgia", danhgia);
    formData.append("noidung", noidung);
    console.log(formData);
    try {
      await axios.patch(`${API_URL}admin/review/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getReviewById = async () => {
    const response = await axios.get(`${API_URL}admin/review/${id}`);
    setMasp(response.data.masp);
    setMakh(response.data.makh);
    setDanhgia(response.data.danhgia);
    setNoidung(response.data.noidung);
  };

  return (
    <div className="containeradmin">
      <Helmet>
        <title>{`Sửa Blog - Admin`}</title>
      </Helmet>
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Mã khách hàng</label>
            <div>
              <input
                type="number"
                placeholder="makh"
                className="form-control"
                value={makh}
                onChange={(e) => setMakh(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Mã sản phẩm</label>
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
            <label className="form-label">Đánh giá</label>
            <div>
              <input
                type="number"
                placeholder="danhgia"
                className="form-control"
                value={danhgia}
                onChange={(e) => setDanhgia(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Nội dung</label>
            <div>
              <input
                type="text"
                placeholder="Noidung"
                className="form-control"
                value={noidung}
                onChange={(e) => setNoidung(e.target.value)}
              />
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
