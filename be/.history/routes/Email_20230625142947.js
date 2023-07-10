import nodemailer from 'nodemailer'
import express from 'express';
const router = express.Router();
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service: 'gmail',
    auth: {
        user: 'phuthuyjay04@gmail.com',
        pass: 'yrtrrfgwpdgphdga'
    }
});



router.post('/admin/payment/mail-thanhtoan', (req, res) => {
    const { email, tenkh } = req.body
    const mailOptions = {
        from: 'phuthuyjay04@gmail.com',
        to: email,
        subject: 'Thông tin đơn hàng đã đặt',
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
            <h1 style="text-align: center; margin-bottom: 30px; color: #333333;">Lời cảm ơn!</h1>
            <div style="color: #555555;">
              <p>Xin chào ${tenkh},</p>
              <p>Cảm ơn bạn đã tin tưởng và mua sản phẩm của chúng tôi. Sản phẩm sẽ sớm đến tay bạn.</p>
              <p>Bạn có thể xem chi tiết hóa đơn bằng cách nhấp vào nút dưới đây:</p>
              <p style="text-align: center;">
                <a href="vlxx.moe" style="display: inline-block; background-color: #4CAF50; color: #FFFFFF; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Xem hóa đơn</a>
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Gửi email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {

            res.send('Email sent successfully');
        }
    });
});
export default router
