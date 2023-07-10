import AdReview from "../models/AdReviewModel.js";
import User from "../models/User.js";
import Product from "../models/ProductModel.js";

export const getReview = async(req, res) => {
    try {
        const response = await AdReview.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getReviewDashBoard = async (req, res) => {
    try {
      const reviews = await AdReview.findAll({
        order: [['createdAt', 'ASC']],
        include: [
          {
            model: User,
            attributes: ["tenkh"], // Lấy chỉ thông tin tên người dùng
          },
          {
            model: Product,
            attributes: ["tensp"], // Lấy chỉ thông tin tên sản phẩm
          },
        ],
      });
  
      res.status(200).json(reviews);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };

export const getReviewById = async(req, res) => {
    try {
        const response = await AdReview.findOne({
            where: {
                makh: req.params.makh
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createReview = async(req, res) => {
    try {
        await AdReview.create(req.body)
        res.status(200).json({msg: "Created"});
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateReviewDashboard = async (req, res) => {
    try {
      const { makh,masp } = req.params;
      const { reply } = req.body;
  
      await AdReview.update({ reply }, { where: { makh:makh ,masp:masp} });
  
      res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Server error" });
    }
  };
  
export const updateReview = async(req, res) => {
    try {
        await AdReview.update(req.body, {
            where: {
                makh: req.params.makh 
            }
        });
        res.status(200).json({msg: "Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteReview = async(req, res) => {
    try {
        await AdReview.destroy({
            where: {
                makh: req.params.makh,
                masp: req.params.masp
            }
        });
        res.status(200).json({msg: "Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}