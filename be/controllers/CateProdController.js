import express from 'express';
import CateProd from '../models/CateProd.js';

export const getCateProd = async (req, res) => {
  try {
    const cate = await CateProd.findAll();
    const cateData = cate.map((item) => ({ stt: item.stt, url: item.url }));
    res.json(cateData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

