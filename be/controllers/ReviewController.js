import Review from "../models/ReviewModel.js";
import Product from "../models/ProductModel.js";
import User from "../models/User.js";


export const addReview = async (req, res) => {
    try {
        const makh = req.body.makh;
        const masp = req.body.masp;
        const danhgia = req.body.danhgia;
        const noidung = req.body.noidung;
        // Kiểm tra sản phẩm có tồn tại trong database hay không
        const product = await Product.findOne({ where: { id: masp } });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Kiểm tra sản phẩm đã có trong giỏ hàng hay chưa
        let review = await Review.findOne({ where: { makh, masp } });

        // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
        if (review == null) {
            review = await Review.create({
                makh,
                masp,
                danhgia,
                noidung,
            });
        } else {
            // Nếu sản phẩm đã có trong giỏ hàng, cập nhật lại số lượng và giá trị
            review.noidung = noidung;
            review.danhgia = danhgia;
            await review.save();
        }

        res.json(review);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

export const getReviewByMasp = async (req, res) => {
    try {
        const { url } = req.params;
        const masp = await Product.findOne({ where: { url: url } })
        const review = await Review.findAll({ where: { masp: masp.id } });
        console.log("query:", review.toString());
        if (!review) {
            return res.status(404).json({ message: "Không có review" });
        }
        res.json(review);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

export const deleteReview = async (req, res) => {
    try {
        const makhCurrent = req.body.makh
        const maspCurrent = req.body.masp
        const userReview = await Review.findOne({ 
            where: { makh: makhCurrent, masp: maspCurrent } 
        })
        
        if(userReview){
            await Review.destroy({where: { makh: userReview.makh, masp: userReview.masp}})
            res.status(200).json({ msg: "Review Deleted" });
        }
        else{
            res.status(404).json({ msg: "Review không tông tại"});
        }
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

export const updateReview = async (req, res) => {
    try {
        const rest = await Review.update(req.body, {
            where: {
                makh: req.body.makh,
                masp: req.body.masp
            }
        });
        console.log(req.body);
        console.log(rest);

        res.status(200).json({ msg: "review Updated" });
    } catch (error) {
        console.log(error.message);
    }
}