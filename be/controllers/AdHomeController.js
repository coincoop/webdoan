import AdHome from "../models/AdHomeModel.js";
import { validationResult } from "express-validator";
import fs from "fs";
import path from "path";
export const getHome = async (req, res) => {
  try {
    const response = await AdHome.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const getHomeById = async (req, res) => {
  try {
    const response = await AdHome.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createHome = async (req, res) => {
  try {
    const { sdt, diachi, gmail, mota, ten, motaFooter,status } = req.body;
    const {imghead, imgfoot,  imgslide } = req.files;
    
    const response = await AdHome.create({
      imghead: imghead.name,
      imgfoot: imgfoot.name,
      imgslide: imgslide.map((file) => file.name).join(","),
      diachi,
      gmail,
      sdt,
      mota,
      motaFooter,
      ten,
      status
    });

    res.status(201).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateHome = async (req, res) => {
  try {
    const { sdt, diachi, gmail, mota, ten, motaFooter} = req.body;
    const {imgslide ,imghead, imgfoot} = req.files || {};
    const home = await AdHome.findOne({ where: { id: req.params.id } });

    if (!home) {
      return res.status(404).json({ msg: "Home not found" });
    }

    const updatedhome = await home.update({
      imgslide: imgslide || imgslide ? imgslide.map((file) => file.name).join(",") : home.imgslide,
      imghead: imghead && imghead.name !== "" ? imghead.name : home.imghead,
      imgfoot: imgfoot && imgfoot.name !== "" ? imgfoot.name : home.imgfoot,

      sdt: sdt !== "" ? sdt : "",
      diachi: diachi !== "" ? diachi : "",
      gmail: gmail !== "" ? gmail : "",
      mota: mota !== "" ? mota : "",
      motaFooter: motaFooter !== "" ? motaFooter : "",
      ten: ten !== "" ? ten : "",
      
    });

    res.status(200).json(updatedhome);
} catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
}
};

export const deleteHome = async (req, res) => {
  try {
    await AdHome.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Home Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStatusHome = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await AdHome.update({ status }, { where: { id } });

    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};
