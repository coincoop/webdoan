import express from "express";


import { getBlog, getBlogById, createBlog, updateBlog, deleteBlog } from "../controllers/AdBlogController.js";
const router = express.Router();

router.post("/admin/blog",createBlog);
router.get('/admin/blog', getBlog);
router.get('/admin/blog/:idblog', getBlogById);
router.patch('/admin/blog/:idblog', updateBlog);
router.delete('/admin/blog/:idblog', deleteBlog);

export default router
