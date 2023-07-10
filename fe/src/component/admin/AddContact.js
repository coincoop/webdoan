import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import "../../css/addmenu.css";
import { Editor } from "@tinymce/tinymce-react";
import { Helmet } from "react-helmet";
import { API_URL } from "../../config";
const AddContact = () => {
  const [sdt, setSdt] = useState("");
  const [diachi, setDiachi] = useState("");
  const [gmail, setGmail] = useState("");
  const [mota, setMota] = useState("");
  const [map, setMap] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const saveContact = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("sdt", sdt);
    formData.append("diachi", diachi);
    formData.append("gmail", gmail);
    formData.append("mota", mota);
    formData.append("map", map);
    formData.append("url", url);
    try {
      await axios.post(`${API_URL}admin/contact`, formData, {
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
        <title>{`Thêm Liên hệ - Admin`}</title>
      </Helmet>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={saveContact} enctype="multipart/form-data"
            method="post">
            
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
            <div className="mb-3">
              <label htmlFor="map" className="form-label">
                Google Map
              </label>
              <input
                type="text"
                className="form-control"
                id="map"
                placeholder="map"
                value={map}
                onChange={(e) => setMap(e.target.value)}
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
                placeholder="url"
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

export default AddContact;
