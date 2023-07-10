import Menu from "../models/MenuModel.js";
import Product from "../models/ProductModel.js";
import Review from "../models/ReviewModel.js";
import express from "express";
import { Op } from "sequelize";
Product.belongsTo(Menu, { foreignKey: "id_loai" });

// API endpoint để lấy tất cả các menu
export const getProduct = async (req, res) => {
  try {
    const products = await Product.findAll();
    const productIds = products.map((product) => product.id);
    const reviews = await Review.findAll({
      where: { masp: productIds },
    });

    // Gom nhóm đánh giá theo masp
    const reviewByProductId = reviews.reduce((acc, review) => {
      const productId = review.masp;
      if (!acc[productId]) {
        acc[productId] = [];
      }
      acc[productId].push(review);
      return acc;
    }, {});

    const data = {

      products: products.map((product) => ({
        ...product.toJSON(),
        reviews: reviewByProductId[product.id] || [], // Thêm mảng đánh giá vào thông tin sản phẩm
      })),
    };

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductWithMaxPrice = async (req, res) => {
  try {
    const maxPrice = await Product.max('dongia');
    const product = await Product.findOne({ where: { dongia: maxPrice } });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getProductUrl = async (req, res) => {
  try {
    const product = await Product.findOne({ where: { url: req.params.url } });

    if (product) {
      const relatedProducts = await Product.findAll({
        where: {
          id_loailon: product.id_loailon,
          id: {
            [Op.not]: product.id, // Loại bỏ sản phẩm chính
          },
        },
      });

      res.json({
        product,
        relatedProducts,
      });
    } else {
      // Xử lý khi không tìm thấy sản phẩm
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// productController.js
export const getProductsByUrl = async (req, res) => {
  try {
    const url = req.params.url;
    const menu = await Menu.findOne({ where: { url: url } });

    if (!menu) {
      return res.status(404).json({ message: "Not found" });
    }

    const products = await Product.findAll({
      where: { [Op.or]: [{ id_loai: menu.id }, { id_loailon: menu.id }] },
    });

    const productIds = products.map((product) => product.id);
    const reviews = await Review.findAll({
      where: { masp: productIds },
    });

    // Gom nhóm đánh giá theo masp
    const reviewByProductId = reviews.reduce((acc, review) => {
      const productId = review.masp;
      if (!acc[productId]) {
        acc[productId] = [];
      }
      acc[productId].push(review);
      return acc;
    }, {});

    const data = {
      name: menu.name,
      products: products.map((product) => ({
        ...product.toJSON(),
        reviews: reviewByProductId[product.id] || [], // Thêm mảng đánh giá vào thông tin sản phẩm
      })),
    };

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id: id } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}
export const getProductSale = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        giacu: {
          [Op.gt]: 0
        }
      }
    });
    const productIds = products.map((product) => product.id);
    const reviews = await Review.findAll({
      where: { masp: productIds },
    });

    const reviewByProductId = reviews.reduce((acc, review) => {
      const productId = review.masp;
      if (!acc[productId]) {
        acc[productId] = [];
      }
      acc[productId].push(review);
      return acc;
    }, {});

    const data = {
      products: products.map((product) => ({
        ...product.toJSON(),
        reviews: reviewByProductId[product.id] || [], // Thêm mảng đánh giá vào thông tin sản phẩm
      })),
    };

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
