import express from 'express';
import Home from '../models/HomeModel.js';


// API endpoint để lấy tất cả các menu
export const getHome = async (req, res) => {
  try {
    const home = await Home.findOne({ where: { status: 1 } });
    res.json(home);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

