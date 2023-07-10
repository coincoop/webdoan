import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import unidecode from "unidecode";
import "../../css/addmenu.css";
import { API_URL } from "../../config";
import { Helmet } from "react-helmet";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import { storage } from "../../firebase.js";
const EditMenu = () => {
  const [name, setName] = useState("");
  const [parent_id, setParentId] = useState("");
  const [img, setImg] = useState(null);
  const [mainImgUrl, setMainImgUrl] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    getMenuById();
    getMenus();
  }, []);

  const getMenus = async () => {
    const response = await axios.get(`${API_URL}admin/admenus`);
    setMenuList(response.data);
  };
  const updateMenu = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("parent_id", parent_id);
    formData.append("img", img);
    formData.append("url", url);
    

    try {
      setLoading(true);
      if (img == null) return;
      const imageRef = ref(storage, `menu/${img.name}`);
      uploadBytes(imageRef, img).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
      
        });
      });

      await axios.patch(`${API_URL}admin/admenus/${id}`,
        {
          name,
          parent_id,
          url,
          img: img.name,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/admin");
      
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };
  const getMenuById = async () => {
    const response = await axios.get(`${API_URL}admin/admenus/${id}`);
    setName(response.data.name);
    setParentId(response.data.parent_id);
    setImg(response.data.img);
    setUrl(response.data.url);
    if (response.data.img) {
      const storageRef = ref(storage, `menu/${response.data.img}`);
      const imgUrl = await getDownloadURL(storageRef);
      setMainImgUrl(imgUrl);
    }
  };
  
  const handleMainImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImg(acceptedFiles[0]);
      setMainImgUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  };
  return (
    <>
    <Helmet>
        <title>{`Sửa Menu - Admin`}</title>
      </Helmet>
      {loading && <div><div class="box-of-star1">
        <div class="star star-position1"></div>
        <div class="star star-position2"></div>
        <div class="star star-position3"></div>
        <div class="star star-position4"></div>
        <div class="star star-position5"></div>
        <div class="star star-position6"></div>
        <div class="star star-position7"></div>
      </div>
        <div class="box-of-star2">
          <div class="star star-position1"></div>
          <div class="star star-position2"></div>
          <div class="star star-position3"></div>
          <div class="star star-position4"></div>
          <div class="star star-position5"></div>
          <div class="star star-position6"></div>
          <div class="star star-position7"></div>
        </div>
        <div class="box-of-star3">
          <div class="star star-position1"></div>
          <div class="star star-position2"></div>
          <div class="star star-position3"></div>
          <div class="star star-position4"></div>
          <div class="star star-position5"></div>
          <div class="star star-position6"></div>
          <div class="star star-position7"></div>
        </div>
        <div class="box-of-star4">
          <div class="star star-position1"></div>
          <div class="star star-position2"></div>
          <div class="star star-position3"></div>
          <div class="star star-position4"></div>
          <div class="star star-position5"></div>
          <div class="star star-position6"></div>
          <div class="star star-position7"></div>
        </div>
        <div data-js="astro" class="astronaut">
          <div class="head"></div>
          <div class="arm arm-left"></div>
          <div class="arm arm-right"></div>
          <div class="body">
            <div class="panel"></div>
          </div>
          <div class="leg leg-left"></div>
          <div class="leg leg-right"></div>
          <div class="schoolbag"></div>
        </div></div>}
      {!loading && (
        <div className="containeradmin">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={updateMenu}>
                <div>
                  <label className="form-label">Tên Menu</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      const value = e.target.value;
                      const url = unidecode(value)
                        .toLowerCase()
                        .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
                        .replace(/[^a-z0-9-]+/g, ""); // Loại bỏ các ký tự không phải chữ cái, số, dấu gạch ngang
                      setName(value);
                      setUrl(url);
                    }}
                  />

                </div>
                <div className="mb-3">
                  <label htmlFor="parent_id" className="form-label">
                    Menu cha
                  </label>
                  <select
                    className="select-control"
                    id="parent_id"
                    value={parent_id}
                    onChange={(e) => setParentId(e.target.value)}
                  >
                    <option value="">-- Chọn menu cha--</option>
                    {menuList.map((menu) => (
                      <option key={menu.id} value={menu.id}>
                        {menu.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="img" className="form-label">
                    Ảnh chính
                  </label>
                  <Dropzone onDrop={handleMainImageDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        {mainImgUrl ? (
                          <img
                            src={mainImgUrl}
                            alt="main"
                            className="img-thumbnail"
                          />
                        ) : (
                          <img
                            src={img}
                            alt="main"
                            className="img-thumbnail"
                          />
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
                <div className="mb-3">
                  <label className="form-label">Url</label>

                  <input
                    type="text"
                    placeholder="Url"
                    className="form-control"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />

                </div>
                <div style={{ textAlign: "center" }}>
                  <button type="submit" className="btn btn-primary" >Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditMenu;
