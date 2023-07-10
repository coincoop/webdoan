import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
// import "tinymce/themes/silver/theme";
import unidecode from "unidecode";
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
const AddBlog = () => {
  const [tenblog, setTenBlog] = useState("");
  const [mota, setMota] = useState("");
  const [img_blog, setImgBlog] = useState(null);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tenblog", tenblog);
    formData.append("mota", mota);
    formData.append("url", url);
    if (img_blog) {
      formData.append("img_blog", img_blog);
    }
    try {
      setLoading(true);
        if (img_blog) {
          const imageRef = ref(storage, `blog/${img_blog.name}`);
          uploadBytes(imageRef, img_blog);
        }
  
      await axios.post(`${API_URL}admin/blog`, {
        tenblog, mota, url, img_blog:img_blog.name
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleMainImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImgBlog(acceptedFiles[0]);

    }
  };


  return (
    <>
     <Helmet>
        <title>{`Thêm Blog - Admin`}</title>
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
          <form
            onSubmit={handleSubmit}
            enctype="multipart/form-data"
            method="post"
          >
            <div className="mb-3">
              <label htmlFor="tenblog" className="form-label">
                Tên Blog
              </label>
              <input
                type="text"
                className="form-control"
                id="tenblog"
                placeholder="Nhập tên sản phẩm"
                value={tenblog}
                onChange={(e) => {const value = e.target.value;
                  const url = unidecode(value)
                    .toLowerCase()
                    .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
                    .replace(/[^a-z0-9-]+/g, ""); // Loại bỏ các ký tự không phải chữ cái, số, dấu gạch ngang
                  setTenBlog(value);
                  setUrl(url);}}
              />
            </div>
            <div className="mb-3">
                  <label htmlFor="img_blog" className="form-label">
                    Ảnh chính
                  </label>
                  <Dropzone onDrop={handleMainImageDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        {img_blog ? (
                          <img
                            src={URL.createObjectURL(img_blog)}
                            alt="main"
                            className="img-thumbnail"
                          />
                        ) : (
                          <p>Kéo vào hoặc chọn ảnh</p>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
            <div className="mb-3">
              <label htmlFor="mota" className="form-label">
                Mô tả
              </label>
              <Editor
                apiKey="f6zg9q8gblile6r6rmxkgy1b153klpznygp25qf70md614u4"
                value={mota}
                init={{
                  height: 500,
                  menubar: true,
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
              Thêm Blog
            </button></div>
          </form>
        </div>
      </div>
    </div>
     )}
     </>
  );
};

export default AddBlog;