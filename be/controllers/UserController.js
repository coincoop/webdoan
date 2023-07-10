import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
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
            vaitro : 0
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
            const { matkhau,resetCode, ...other } = userPlain;
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
        const { matkhau,resetCode, ...other } = userPlain;
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

export const getTenkh = async (req, res) => {
    try {
      const { makh } = req.params;
      const user = await User.findOne({ where: { makh: makh } });
      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy khách hàng" });
      }
      const tenkh = user.tenkh; // Lấy tên khách hàng từ user object

      res.status(200).json({ tenkh });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  };

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service: 'gmail',
    auth: {
        user: 'phuthuyjay04@gmail.com',
        pass: 'yrtrrfgwpdgphdga'
    }
});
  
  // API để yêu cầu khôi phục mật khẩu
  export const requestPasswordReset = async (req, res) => {
    try {
      const  email  = req.body.email;
  
   
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'Email không tồn tại' });
      }

      const resetCodene = Math.floor(100000 + Math.random() * 900000)
  
    
      await User.update( {resetCode: resetCodene} ,{ where: { makh:user.makh}})
  
    
      const mailOptions = {
        from: 'phuthuyjay04@gmail.com',
        to: email,
        subject: 'Khôi phục mật khẩu',
        text: `Mã khôi phục mật khẩu của bạn là: ${resetCodene}`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi email' });
        }
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email khôi phục mật khẩu đã được gửi' });
  
        setTimeout(async () => {
          
            await User.update({ resetCode: null }, { where: { makh: user.makh } });
            console.log('Email deleted after 2 minutes');
          }, 5 * 60 * 1000); // 5 phút 
        
      });
     
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
  };

  export const resetPassword = async (req ,res) => {
    try {
        const resetCodefe = req.body.resetCode
        const email = req.body.email
        const user = await User.findOne({where:{ email: email}})
        if (!user) {
            return res.status(404).json({ error: 'Email không tồn tại' });
        }
        console.log(user);
        console.log(email);
        console.log( req.body.resetCode);
        console.log(user.resetCode);
        if(resetCodefe !== user.resetCode) {
            return res.status(404).json({ error: 'Sai code' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.matkhau, salt);
        const matkhau = hashed

        await User.update({matkhau:matkhau, secretCode : null},{where: {makh : user.makh}})
        
        res.status(200).json({ msg: "Password Updated" });

    } catch (error) {   
        console.log(error);
    }
  }
