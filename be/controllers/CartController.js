import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";
import User from "../models/User.js";

export const getAllCart = async (req, res) => {
  try {
    const carts = await Cart.findAll();
    console.log(carts)
    res.json(carts); //
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const makh = req.body.makh;
    const masp = req.body.masp;
    const quantity = req.body.quantity;
    // Kiểm tra sản phẩm có tồn tại trong database hay không
    const product = await Product.findOne({ where: { id: masp } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Kiểm tra sản phẩm đã có trong giỏ hàng hay chưa
    let cart = await Cart.findOne({ where: { makh, masp } });

    // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
    if (cart == null) {
      cart = await Cart.create({
        makh,
        masp,
        quantity
      });
    } else {
      // Nếu sản phẩm đã có trong giỏ hàng, cập nhật lại số lượng và giá trị
      cart.quantity += quantity;
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

export const getCartByMakh = async (req, res) => {
  try {
    const { makh } = req.params;
    const cart = await Cart.findAll({ where: { makh: makh } });
    console.log("query:", cart.query); // Thêm dòng này để log ra câu truy vấn
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { makh } = req.params
    const { masp } = req.params
    if (masp == null) {
      await Cart.destroy({
        where: {
          makh,
        }
      });
    } else {
      await Cart.destroy({
        where: {
          makh,
          masp
        }
      });
    }


    res.status(200).json({ msg: "Cart Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

export const deleteMultipleCart = async (req, res) => {
  try {
    const masp = req.body.masp
    const makh = req.body.makh;
    await Cart.destroy({
      where: {
        masp: masp,
        makh: makh
      }

    });

    res.status(200).json({ msg: "Carts Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
};

export const updateCart = async (req, res) => {
  try {
    const rest = await Cart.update(req.body, {
      where: {
        makh: req.body.makh,
        masp: req.body.masp
      }
    });
    console.log(req.body);
    console.log(rest);

    res.status(200).json({ msg: "Cart Updated" });
  } catch (error) {
    console.log(error.message);
  }
}

export const addMultipleToCart = async (req, res) => {
  try {
    const makh = req.body.makh;
    const maspArray = req.body.masp;
    const quantityArray = req.body.quantity;

    if (!maspArray || !Array.isArray(maspArray) || !quantityArray || !Array.isArray(quantityArray)) {
      return res.status(400).json({ message: "Invalid product data" });
    }

    if (maspArray.length !== quantityArray.length) {
      return res.status(400).json({ message: "Invalid product data: mismatched array lengths" });
    }

    for (let i = 0; i < maspArray.length; i++) {
      const masp = maspArray[i];
      const quantity = quantityArray[i];

      // Kiểm tra sản phẩm có tồn tại trong database hay không
      const product = await Product.findOne({ where: { id: masp } });
      if (!product) {
        return res.status(404).json({ message: `Product not found for masp ${masp}` });
      }

      // Kiểm tra sản phẩm đã có trong giỏ hàng hay chưa
      let cart = await Cart.findOne({ where: { makh, masp } });

      // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
      if (!cart) {
        cart = await Cart.create({
          makh,
          masp,
          quantity
        });
      } else {
        // Nếu sản phẩm đã có trong giỏ hàng, cập nhật lại số lượng và giá trị
        cart.quantity += quantity;
        await cart.save();
      }
    }

    res.json({ message: "Products added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

export const sumThanhtien = async (req, res) => {
  try {
    const { makh } = req.params
    const maspByMakh = await Cart.findAll({ where: { makh: makh } })
    if (!maspByMakh) {
      return res.status(404).json({ message: `Masp not found for masp ${makh}` });
    }
    const productByMasp = [];
    let thanhtien = 0
    for (let i = 0; i < maspByMakh.length; i++) {
      const pro = await Product.findOne({ where: { id: maspByMakh[i].masp } });
      productByMasp.push(pro);
    }
    if (!productByMasp) {
      return res.status(404).json({ message: `Product not found for masp ` });
    }

    for (let i = 0; i < maspByMakh.length; i++) {
      thanhtien += maspByMakh[i].quantity * productByMasp[i].dongia
    }
    console.log(maspByMakh);
    console.log(productByMasp);
    console.log(makh);
    res.json(thanhtien)
  } catch (error) {
    console.log(error);
  }
}

