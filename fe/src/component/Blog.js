import React, { useState, useEffect } from "react";
import axios from "axios";
import { Outlet, Link, useNavigate,useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import "../css/blog.css";
import { API_URL } from "../config";
export default function Blog() {
  const { url } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [tenblog, setTenBlog] = useState('');
  const [mota, setMota] = useState('');
  useEffect(() => {
    getBlogs();
  }, [url]);

  const getBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}blog/${url}`);
      setBlogs(response.data);
      setMota(response.data.mota)
      setTenBlog(response.data.tenblog)
    } catch (error) {
      console.error(error);
    }
  };

  return (
   
    <section>
      <Helmet>
          <title>{`${tenblog}  - Gaming Zone`}</title>
        </Helmet>
      <div class="container mt-3 blogct">
        <div dangerouslySetInnerHTML={{ __html: mota }}></div>

      </div>
    </section>
  );
}
