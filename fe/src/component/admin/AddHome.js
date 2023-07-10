import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import "../../css/addmenu.css";
import { Helmet } from "react-helmet";
import { Editor } from "@tinymce/tinymce-react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import { storage } from "../../firebase.js";
import { API_URL } from "../../config";
const AddHome = () => {
  const [imghead, setImgHead] = useState(null);
  const [imgfoot, setImgFoot] = useState(null);

  const [sdt, setSdt] = useState("");
  const [imgslide, setImgSlide] = useState([]);

  const [diachi, setDiachi] = useState("");
  const [gmail, setGmail] = useState("");
  const [mota, setMota] = useState("");
  const [status, setStatus] = useState(0);
  const [motaFooter, setMotaFooter] = useState("");
  const [ten, setTen] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const saveHome = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("imghead", imghead);
    formData.append("imgfoot", imgfoot);

    imgslide.forEach((file) => {
      formData.append("imgslide", file);
    });
    formData.append("sdt", sdt);
    formData.append("diachi", diachi);
    formData.append("gmail", gmail);
    formData.append("mota", mota);
    formData.append("status", status);
    formData.append("motaFooter", motaFooter);
    formData.append("ten", ten);
    try {
      setLoading(true);
      if (imghead == null) return;
      const imageRef1 = ref(storage, `home/${imghead.name}`);
      uploadBytes(imageRef1, imghead)
      if (imgfoot == null) return;
      const imageRef2 = ref(storage, `home/${imgfoot.name}`);
      uploadBytes(imageRef2, imgfoot)
     
      imgslide.forEach(async (file) => {
        const subImageRef = ref(storage, `home/${file.name}`);
        await uploadBytes(subImageRef, file);
      });
      await axios.post(`${API_URL}admin/home`, 
        formData
      , {
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
  const handleImageHeadDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImgHead(acceptedFiles[0]);
    }
  };
  const handleSubImageDrop = (acceptedFiles) => {
    setImgSlide([...imgslide, ...acceptedFiles]);
    const fileNames = acceptedFiles.map((file) => file.name);
    console.log(fileNames);
  };
  const handleImageFootDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImgFoot(acceptedFiles[0]);
    }
  };

  
  return (
    <>
    <Helmet>
        <title>{`Thêm Chủ Đề - Admin`}</title>
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
              <form onSubmit={saveHome} enctype="multipart/form-data"
                method="post">
                <div className="mb-3">
                  <label htmlFor="ten" className="form-label">
                    Tên
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ten"
                    placeholder="Tên"
                    value={ten}
                    onChange={(e) => setTen(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imghead" className="form-label">
                    Ảnh Header
                  </label>
                  <Dropzone onDrop={handleImageHeadDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        {imghead ? (
                          <img
                            src={URL.createObjectURL(imghead)}
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
                  <label htmlFor="imgfoot" className="form-label">
                    Ảnh Footer
                  </label>
                  <Dropzone onDrop={handleImageFootDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        {imgfoot ? (
                          <img
                            src={URL.createObjectURL(imgfoot)}
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
                    Ảnh Trang Slide
                  </label>
                  <Dropzone onDrop={handleSubImageDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p>Drop images slide here or click to select files</p>
                      </div>
                    )}
                  </Dropzone>
                  {imgslide.length > 0 && (
                    <div className="mt-3">
                      {imgslide.map((image, index) => (
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
                  <label htmlFor="mota_chinh" className="form-label">
                    Mô tả chi tiết
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
                  <label htmlFor="motaFooter" className="form-label">
                    Mô tả ở Footer
                  </label>
                  <Editor
                    apiKey="f6zg9q8gblile6r6rmxkgy1b153klpznygp25qf70md614u4"
                    value={motaFooter}
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
                    onEditorChange={(content) => setMotaFooter(content)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="sdt" className="form-label">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="sdt"
                    placeholder="Số điện thoại"
                    value={sdt}
                    onChange={(e) => setSdt(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="diachi" className="form-label">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="diachi"
                    placeholder="Địa chỉ"
                    value={diachi}
                    onChange={(e) => setDiachi(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="gmail" className="form-label">
                    Gmail
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="gmail"
                    placeholder="Gmail"
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)}
                  />
                </div>
                <div style={{ textAlign: "center" }}><button type="submit" className="btn btn-primary" >
                  Thêm
                </button></div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddHome;
