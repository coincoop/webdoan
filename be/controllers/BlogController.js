import express from 'express';
import Blog from '../models/BlogModel.js';


// API endpoint để lấy tất cả các menu
export const getBlog = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getBlogUrl = async (req, res) => {
  try {
    const s = await Blog.findOne({ where: { url: req.params.url } });
    res.json(s);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};