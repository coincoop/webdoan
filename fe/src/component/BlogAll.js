import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { API_URL } from "../config";
import { colors } from "@mui/material";
import "../css/blogall.css"
import { getDownloadURL, ref } from "firebase/storage";
import { Helmet } from "react-helmet";
import { storage } from "../firebase";
export default function BlogAll() {
  const [blog, setBlog] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    const response = await axios.get(`${API_URL}blog/all`);
    await Promise.all(
        response.data.map(async (prod) => {
          if (prod.img_blog) {
            const storageRef = ref(storage, `blog/${prod.img_blog}`);
            const imgUrl = await getDownloadURL(storageRef);
            prod.img_blog = imgUrl;
          }
        })
      );
    setBlog(response.data);
  };

  const record = blog.slice(firstIndex, lastIndex);
  const npage = Math.ceil(blog.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== firstIndex + 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCurrentPage = (n) => {
    setCurrentPage(n);
  };

  return (
    <div>
      <Helmet>
        <title>{`Blog - Gaming Zone`}</title>
      </Helmet>
      <div className="blog-post blogall">
        <div className="container">
          <h2 className="section-header">Tin tức công nghệ</h2>

          <div className="row">
            {record.map((item) => (
              <div key={item.idblog} className="col-md-4">
                <div className="blog-item">
                  <div className="blog-content">
                  <div className="article-card__image media">
                  <Link className="blog-link" to={`/blog/${item.url}`}>
                    <img
                      alt={item.title}
                      width="100%"
                      height="300"
                      loading="lazy"
                      className="motion-reduce"
                      src={item.img_blog}
                      style={{borderRadius: "3%"}}
                    />
                    </Link>
                  </div>
                    <p className="blog-date" style={{paddingTop: "5px"}}>
                      Post Date: {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                    <Link className="blog-link" to={`/blog/${item.url}`}>
                      <h2 className="blog-title">
                        <span className="link-hover">{item.tenblog}</span>
                      </h2>
                    </Link>
                    <Link className="link-base link- blogall-but" to={`/blog/${item.url}`}>
                      Xem Thêm <i><FaPlus /></i>
                    </Link>
                    <div dangerouslySetInnerHTML={{ __html: item.mota_chinh }}></div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage !== firstIndex + 1 ? "" : "disabled"}`}>
            <a className={`page-link `} style={{ cursor: "pointer" }} onClick={prePage}>
              Previous
            </a>
          </li>
          {numbers.map((n, i) => (
            <li key={i} className={`page-item ${currentPage === n ? "active" : ""}`}>
              <a
                className="page-link"
                style={{ cursor: "pointer" }}
                onClick={() => changeCurrentPage(n)}
              >
                {n}
              </a>
            </li>
          ))}
          <li className={`page-item ${currentPage !== npage ? "" : "disabled"}`}>
            <a className="page-link" style={{ cursor: "pointer" }} onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}