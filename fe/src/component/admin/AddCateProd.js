import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { Helmet } from "react-helmet";
import unidecode from "unidecode";
import { API_URL } from "../../config";
const AddCateProd = () => {
  const [ten, setTen] = useState("");
  const [stt, setStt] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ten", ten);
    formData.append("stt", stt);
    formData.append("url", url);
   
    try {
      await axios.post(`${API_URL}admin/cateProd`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="containeradmin">
       <Helmet>
        <title>{`Thêm Phân Loại - Admin`}</title>
      </Helmet>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form
            onSubmit={handleSubmit}
            enctype="multipart/form-data"
            method="post"
          >
            <div className="mb-3">
              <label htmlFor="stt" className="form-label">
                Stt
              </label>
              <input
                type="number"
                className="form-control"
                id="stt"
                placeholder="Nhập stt"
                value={stt}
                onChange={(e) => setStt(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ten" className="form-label">
                Tên
              </label>
              <input
                type="text"
                className="form-control"
                id="ten"
                placeholder="Nhập tên"
                value={ten}
                onChange={(e) => {const value = e.target.value;
                  const url = unidecode(value)
                    .toLowerCase()
                    .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
                    .replace(/[^a-z0-9-]+/g, ""); // Loại bỏ các ký tự không phải chữ cái, số, dấu gạch ngang
                  setTen(value);
                  setUrl(url);}}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="url" className="form-label">
                Url
              </label>
              <input
                type="text"
                className="form-control"
                id="url"
                placeholder="Nhập tên Blog"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div style={{textAlign: "center"}}><button type="submit" className="btn btn-primary" >
              Thêm 
            </button></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCateProd;