import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import cookie from 'cookie';

dotenv.config();
let refreshTokens = [];

export const userRegister = async (req, res) => {
    try {
       
        // Kiểm tra trùng lặp username
        const existingUsername = await User.findOne({where: { username: req.body.username }});
        if (existingUsername) {
            return res.status(400).json({ error: "Username đã tồn tại" });
        }
        // Kiểm tra trùng lặp email
        const existingEmail = await User.findOne({where: { email: req.body.email }});
        if (existingEmail) {
            return res.status(401).json({ error: "Email đã tồn tại" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.matkhau, salt);
        const tenkh = req.body.tenkh;
        const username = req.body.username;
        const matkhau = hashed;
        const email = req.body.email;
        const diachi = req.body.diachi;
        const sodienthoai = req.body.sodienthoai;

        const user = await User.create({
            tenkh,
            username,
            matkhau,
            email,
            diachi,
            sodienthoai,
        });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

//accessToken
const generateAccessToken = (user) => {
    return jwt.sign({
        makh: user.makh,
        vaitro: user.vaitro
    },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: "7d" }
    )
}
const generateRefreshToken = (user) => {
    return jwt.sign({
        makh: user.makh,
        vaitro: user.vaitro
    },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: "365d" }
    )
}

//login
export const userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } })
        if (!user) {
            return res.status(404).json('Wrong username');
        }
        const validPassword = await bcrypt.compare(req.body.matkhau, user.matkhau);
        if (!validPassword) {
            return res.status(401).json('Wrong password');
        }
        if (user && validPassword) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            })
            const userPlain = user.get({ plain: true });
            const { matkhau, ...other } = userPlain;
            return res.status(200).json({ ...other, accessToken });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
};

export const userRefresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("bạn chưa đăng nhập");
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token không hợp lệ")
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
        if (err) {
            console.log(err);
        }
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
        })
        res.status(200).json({ accessToken: newAccessToken });
    })
}

//store token

export const userLogout = async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
    res.status(200).json("Đăng xuất thành công");
}

export const getUserByMakh = async (req, res) => {

    try {
        const { makh } = req.params
        const user = await User.findOne({ where: { makh: makh } })
        if (!user) {
            return res.status(404).json({ message: "Không có user" });
        }
        const userPlain = user.get({ plain: true });
        const { matkhau, ...other } = userPlain;
        const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            })
        res.json({ ...other, accessToken});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

export const editUser = async (req, res) => {
    try {
        const { makh } = req.params
        const user = await User.findOne({ where: { makh: makh } })
        if (!user) {
            return res.status(404).json({ message: "Không có user" });
        }
        await User.update(req.body ,{ where: { makh:makh}})
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        console.log(error);
    }
}