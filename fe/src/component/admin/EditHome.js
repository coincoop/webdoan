import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import { Helmet } from "react-helmet";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import { storage } from "../../firebase.js";
import { API_URL } from "../../config";
const EditHome = () => {
  const [imghead, setImgHead] = useState(null);
  const [headImgUrl, setHeadImgUrl] = useState("");
  const [imgfoot, setImgFoot] = useState(null);
  const [footImgUrl, setFootImgUrl] = useState("");

  const [imgslide, setImgSlide] = useState([]);
  const [subImgUrls, setSubImgUrls] = useState([]);

  const [sdt, setSdt] = useState("");
  const [diachi, setDiachi] = useState("");
  const [gmail, setGmail] = useState("");
  const [mota, setMota] = useState("");
  const [motaFooter, setMotaFooter] = useState("");
  const [ten, setTen] = useState("");
  const navigate = useNavigate();
  const [warning, setWarning] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getHomeById();
  }, []);

  const updateHome = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("imghead", imghead);
    formData.append("imgfoot", imgfoot);
    formData.append("sdt", sdt);
    formData.append("diachi", diachi);
    imgslide.forEach((file) => {
      formData.append("imgslide", file);
    });
    formData.append("gmail", gmail);
    formData.append("mota", mota);
    formData.append("motaFooter", motaFooter);
    formData.append("ten", ten);
    try {
      setLoading(true);
      imgslide.forEach(async (file) => {
        const subImageRef = ref(storage, `home/${file.name}`);
        await uploadBytes(subImageRef, file);
       
      });
      if (imghead == null) return;
      const imageRef1 = ref(storage, `home/${imghead.name}`);
      uploadBytes(imageRef1, imghead).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {

        });
      });
      if (imgfoot == null) return;
      const imageRef2 = ref(storage, `home/${imgfoot.name}`);
      uploadBytes(imageRef2, imgfoot).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {

        });
      });
      
      await axios.patch(`${API_URL}admin/home/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };
  const getHomeById = async () => {
    const response = await axios.get(`${API_URL}admin/home/${id}`);
    setImgHead(response.data.imghead);
    setImgFoot(response.data.imgfoot);
 
    setSdt(response.data.sdt);
    setImgSlide(response.data.imgslide);
    setDiachi(response.data.diachi);
    setGmail(response.data.gmail);
    setMota(response.data.mota);
    setMotaFooter(response.data.motaFooter);
    setTen(response.data.ten);
    const imgConUrls = await Promise.all(
      response.data.imgslide.split(",").map(async (name) => {
        const storageRef = ref(storage, `home/${name}`);
        return await getDownloadURL(storageRef);
      })
    );
    setImgSlide(imgConUrls);
    if (response.data.imghead) {
      const storageRef = ref(storage, `home/${response.data.imghead}`);
      const headImgUrl = await getDownloadURL(storageRef);
      setHeadImgUrl(headImgUrl);
    }
    if (response.data.imgfoot) {
      const storageRef = ref(storage, `home/${response.data.imgfoot}`);
      const footImgUrl = await getDownloadURL(storageRef);
      setFootImgUrl(footImgUrl);
    }

  };
  const handleHeadImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImgHead(acceptedFiles[0]);
      setHeadImgUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  };
  const handleFootImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImgFoot(acceptedFiles[0]);
      setFootImgUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  };
  
  const handleSubImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length < 2) {
      setWarning("Vui lòng chọn 2 hình trở lên");
      return;
    }
    setWarning("");
    const newSubImgUrls = acceptedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    // Kiểm tra từng ảnh mới đã tồn tại trong danh sách chưa
    const newSubImgUrlsFiltered = newSubImgUrls.filter(
      (newUrl) => subImgUrls.findIndex((url) => url === newUrl) === -1
    );
    if (newSubImgUrlsFiltered.length > 0) {
      setImgSlide([...acceptedFiles]);
      setSubImgUrls((prevUrls) => [...prevUrls, ...newSubImgUrlsFiltered]);
    }
  };
  return (
    <>
    <Helmet>
        <title>{`Sửa Chủ Đề - Admin`}</title>
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
            <form onSubmit={updateHome}>
              <div className="mb-3">
                <label className="form-label">Tên</label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên"
                    id="ten"
                    value={ten}
                    onChange={(e) => setTen(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="imghead" className="form-label">
                  Ảnh Header
                </label>
                <Dropzone onDrop={handleHeadImageDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />
                      {headImgUrl ? (
                        <img
                          src={headImgUrl}
                          alt="main"
                          className="img-thumbnail"
                        />
                      ) : (
                        <img
                          src={imghead}
                          alt="main"
                          className="img-thumbnail"
                        />
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>

              <div className="mb-3">
                <label htmlFor="imgfoot" className="form-label">
                  Ảnh Footer
                </label>
                <Dropzone onDrop={handleFootImageDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />
                      {footImgUrl ? (
                        <img
                          src={footImgUrl}
                          alt="main"
                          className="img-thumbnail"
                        />
                      ) : (
                        <img
                          src={imgfoot}
                          alt="main"
                          className="img-thumbnail"
                        />
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
              {warning && <div className="alert alert-danger">{warning}</div>}
              {Array.isArray(imgslide) && imgslide.length > 0 && (
                <div className="mt-3 row">
                  {imgslide.map((image, index) => (
                    <div key={`sub-image-${index}`} className="col-6">
                      {image.name &&
                      image.type &&
                      image.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="sub"
                          className="img-thumbnail"
                        />
                      ) : (
                        <img
                          src={image}
                          alt="sub"
                          className="img-thumbnail"
                        />
                      )}
                    </div>
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
                <label className="form-label">Số điện thoại</label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="sdt"
                    id="sdt"
                    value={sdt}
                    onChange={(e) => setSdt(e.target.value)}
                  />
                </div>
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
              <div style={{ textAlign: "center" }}>
                <button type="submit" className="btn btn-primary" >Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditHome;
