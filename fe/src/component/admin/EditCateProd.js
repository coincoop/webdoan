import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import unidecode from "unidecode";
import { Helmet } from "react-helmet";
import { API_URL } from "../../config";
const EditCateProd = () => {
  const [ten, setTen] = useState("");
  const [stt, setStt] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    getCateProdById();
  }, []);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ten", ten);
    formData.append("stt", stt);
    formData.append("url", url);
    console.log(formData);
    try {
      await axios.patch(`${API_URL}admin/cateProd/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getCateProdById = async () => {
    const response = await axios.get(`${API_URL}admin/cateProd/${id}`);
    
    setTen(response.data.ten);
    setStt(response.data.stt);
    setUrl(response.data.url);
  };

  return (
    <div className="containeradmin">
      <Helmet>
        <title>{`Sửa Phân Loại - Admin`}</title>
      </Helmet>
      <div className="row">
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label className="form-label">Stt</label>
            <div>
              <input
                type="number"
                placeholder="Stt"
                className="form-control"
                value={stt}
                onChange={(e) => setStt(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Tên</label>
            <div>
              <input
                type="text"
                placeholder="Tên"
                value={ten}
                className="form-control"
                onChange={(e) => {
                  const value = e.target.value;
                  const url = unidecode(value)
                    .toLowerCase()
                    .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
                    .replace(/[^a-z0-9-]+/g, ""); // Loại bỏ các ký tự không phải chữ cái, số, dấu gạch ngang
                  setTen(value);
                  setUrl(url);
                }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Url</label>
            <div>
              <input
                type="text"
                placeholder="Url"
                className="form-control"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
          <div style={{textAlign: "center"}}>
              <button type="submit" className="btn btn-primary" >Update</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditCateProd;
