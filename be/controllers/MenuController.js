import express from 'express';
import Menu from '../models/MenuModel.js';


// API endpoint để lấy tất cả các menu
export const getMenu = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.json(menus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMenuUrl = async (req, res) => {
  try {
    const menus = await Menu.findOne({ where: { url: req.params.url } });
    res.json(menus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};