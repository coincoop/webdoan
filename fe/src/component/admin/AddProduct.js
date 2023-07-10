import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import { Helmet } from "react-helmet";
import unidecode from "unidecode";
import { API_URL } from "../../config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import { storage } from "../../firebase.js";
const AddProduct = () => {
  const [tensp, setTensp] = useState("");
  const [mota, setMota] = useState("");
  const [mota_chinh, setMotachinh] = useState("");
  const [dongia, setDongia] = useState("");
  const [giacu, setGiacu] = useState("");
  const [img, setImg] = useState(null);
  const [img_con, setImg_con] = useState([]);
  const [id_loailon, setIdloailon] = useState("");
  const [menu1List, setMenu1List] = useState([]);
  const [id_loai, setIdloai] = useState([]);
  const [menu2List, setMenu2List] = useState([]);

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tensp", tensp);
    formData.append("mota", mota);
    formData.append("mota_chinh", mota_chinh);
    formData.append("dongia", dongia);
    formData.append("giacu", giacu);
    formData.append("img", img);
    img_con.forEach((file) => {
      formData.append("img_con", file);
    });
    formData.append("id_loailon", id_loailon);
    formData.append("id_loai", id_loai.join(","));
    
    formData.append("url", url);
    console.log(formData.get("img"));
    console.log(formData.getAll("img_con"));
    try {
      setLoading(true);
      if (img == null) return;
      const imageRef = ref(storage, `product/${img.name}`);
      uploadBytes(imageRef, img);

      img_con.forEach(async (file) => {
        const subImageRef = ref(storage, `product/${file.name}`);
        await uploadBytes(subImageRef, file);
      });

      await axios.post(`${API_URL}admin/adproducts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMenus();
  }, []);
  const getMenus = async () => {
    const response = await axios.get(`${API_URL}admin/admenus`);
    setMenu1List(response.data);
    setMenu2List(response.data);
  };
  const handleMainImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImg(acceptedFiles[0]);
    }
  };

  const handleSubImageDrop = (acceptedFiles) => {
    setImg_con([...img_con, ...acceptedFiles]);
    const fileNames = acceptedFiles.map((file) => file.name);
    console.log(fileNames);
  };

  // useEffect(() => {
  //   if (img) {
  //     console.log(img);
  //   }
  //   if (img_con.length > 0) {
  //     console.log(img_con);
  //   }
  // }, [img, img_con]);

  return (
    <>
      <Helmet>
        <title>{`Thêm Sản Phẩm - Admin`}</title>
      </Helmet>
      {loading && (
        <div>
          <div class="box-of-star1">
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
          </div>
        </div>
      )}
      {!loading && (
        <div className="containeradmin">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form
                onSubmit={handleSubmit}
                enctype="multipart/form-data"
                method="post"
              >
                <div className="mb-3">
                  <label htmlFor="tensp" className="form-label">
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tensp"
                    placeholder="Nhập tên sản phẩm"
                    value={tensp}
                    onChange={(e) => {
                      const value = e.target.value;
                      const url = unidecode(value)
                        .toLowerCase()
                        .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
                        .replace(/[^a-z0-9-]+/g, ""); // Loại bỏ các ký tự không phải chữ cái, số, dấu gạch ngang
                      setTensp(value);
                      setUrl(url);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mota" className="form-label">
                    Mô tả ngắn
                  </label>
                  <Editor
                    apiKey="f6zg9q8gblile6r6rmxkgy1b153klpznygp25qf70md614u4"
                    value={mota}
                    init={{
                      height: 500,
                      menubar: true,
                      images_upload_max_filesize: "5mb",
                      plugins: [
                        "autoresize",
                        "autosave",
                        "autolink",
                        "autosubmit",
                        "bbcode",

                        "codesample",
                        "directionality",
                        "emoticons",
                        "fullpage",
                        "fullscreen",
                        "help",
                        "hr",
                        "image",
                        "imagetools",
                        "importcss",
                        "insertdatetime",
                        "legacyoutput",
                        "link",
                        "lists",
                        "media",
                        "nonbreaking",
                        "noneditable",
                        "pagebreak",
                        "paste",
                        "preview",
                        "print",
                        "quickbars",
                        "searchreplace",
                        "spellchecker",
                        "tabfocus",
                        "table",
                        "template",
                        "textcolor",
                        "textpattern",
                        "toc",
                        "visualblocks",
                        "visualchars",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | styleselect | bold italic underline strikethrough | " +
                        "forecolor backcolor | link image media | alignleft aligncenter " +
                        "alignright alignjustify | numlist bullist outdent indent | " +
                        "removeformat | subscript superscript | code | table | hr | " +
                        "blockquote | charmap | emoticons | preview | searchreplace | " +
                        "visualblocks | visualchars | fullscreen | help | insertdatetime | " +
                        "nonbreaking | pagebreak | paste",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    onEditorChange={(content) => setMota(content)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mota_chinh" className="form-label">
                    Mô tả chi tiết
                  </label>
                  <Editor
                    apiKey="f6zg9q8gblile6r6rmxkgy1b153klpznygp25qf70md614u4"
                    value={mota_chinh}
                    init={{
                      height: 500,
                      menubar: true,
                      images_upload_max_filesize: "5mb",
                      plugins: [
                        "autoresize",
                        "autosave",
                        "autolink",
                        "autosubmit",
                        "bbcode",
                        "codesample",
                        "directionality",
                        "emoticons",
                        "fullpage",
                        "fullscreen",
                        "help",
                        "hr",
                        "image",
                        "imagetools",
                        "importcss",
                        "insertdatetime",
                        "legacyoutput",
                        "link",
                        "lists",
                        "media",
                        "nonbreaking",
                        "noneditable",
                        "pagebreak",
                        "paste",
                        "preview",
                        "print",
                        "quickbars",
                        "searchreplace",
                        "spellchecker",
                        "tabfocus",
                        "table",
                        "template",
                        "textcolor",
                        "textpattern",
                        "toc",
                        "visualblocks",
                        "visualchars",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | styleselect | bold italic underline strikethrough | " +
                        "forecolor backcolor | link image media | alignleft aligncenter " +
                        "alignright alignjustify | numlist bullist outdent indent | " +
                        "removeformat | subscript superscript | code | table | hr | " +
                        "blockquote | charmap | emoticons | preview | searchreplace | " +
                        "visualblocks | visualchars | fullscreen | help | insertdatetime | " +
                        "nonbreaking | pagebreak | paste",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    onEditorChange={(content) => setMotachinh(content)}
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="giacu" className="form-label">
                    Giá cũ
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="giacu"
                    placeholder="Nhập giá cũ"
                    value={giacu}
                    onChange={(e) => setGiacu(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dongia" className="form-label">
                    Giá mới
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="dongia"
                    placeholder="Nhập đơn giá"
                    value={dongia}
                    onChange={(e) => setDongia(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="img" className="form-label">
                    Ảnh chính
                  </label>
                  <Dropzone onDrop={handleMainImageDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        {img ? (
                          <img
                            src={URL.createObjectURL(img)}
                            alt="main"
                            className="img-thumbnail"
                          />
                        ) : (
                          <p>Drop main image here or click to select file</p>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
                <div className="mb-3">
                  <label htmlFor="img_con" className="form-label">
                    Ảnh phụ
                  </label>
                  <Dropzone onDrop={handleSubImageDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p>Drop sub images here or click to select files</p>
                      </div>
                    )}
                  </Dropzone>
                  {img_con.length > 0 && (
                    <div className="mt-3">
                      {img_con.map((image, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(image)}
                          alt={`sub-${index}`}
                          className="img-thumbnail mx-2"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="id_loailon" className="form-label">
                    Sản phẩm liên quan
                  </label>
                  <select
                    className="select-control"
                    id="id_loailon"
                    value={id_loailon}
                    onChange={(e) => setIdloailon(e.target.value)}
                  >
                    <option value="">-- Chọn menu cấp 1 --</option>
                    {menu1List.map((menu) => (
                      <option key={menu.id} value={menu.id}>
                        {menu.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="id_loai" className="form-label">
                    Menu chứa sản phẩm
                  </label>
                  <select
                    className="select-control"
                    id="id_loai"
                    value={id_loai}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.options)
                        .filter((option) => option.selected)
                        .map((option) => option.value);
                      setIdloai(selectedOptions);
                    }}
                    multiple
                  >
                    <option value="">-- Chọn menu cấp 2 --</option>
                    {menu2List.map((menu) => (
                      <option key={menu.id} value={menu.id}>
                        {menu.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div style={{ textAlign: "center" }}>
                  <button type="submit" className="btn btn-primary">
                    Thêm sản phẩm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProduct;
