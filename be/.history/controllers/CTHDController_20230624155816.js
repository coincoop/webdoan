import AdProduct from "../models/AdProductModel.js";
import User from "../models/User.js";
import Hoadon from "../models/ReceiptModel.js";
import Cthoadon  from "../models/CTHDModel.js";
import db from '../config/Database.js'; 
import { Sequelize, Op } from 'sequelize';

export const addCtHoaDon = async (req, res) => {
    const transaction = await db.transaction();
  
    try {
      const { mahd } = req.params;
     const { masp, soluong, dongia } = req.body;
    
    
      // Tạo hóa đơn chi tiết và lưu vào cơ sở dữ liệu trong transaction
      const addcthd = await Cthoadon.create(
        {
          mahd: mahd,
          masp: masp,
          soluong: soluong,
          dongia: dongia,
          tongtien: soluong*dongia,
        },
        { transaction }
      );
  
      // Lưu các bảng khác cùng mahd trong transaction
  
      // Commit transaction sau khi đã lưu thành công
      await transaction.commit();
  
      res.status(201).json(addcthd);
    } catch (error) {
      // Rollback transaction nếu có lỗi xảy ra
      await transaction.rollback();
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const getProductsDashboard = async (req, res) => {
    try {
      const response = await Cthoadon.findAll({
        include: [{ model: AdProduct, as: 'sanpham' }], // Sử dụng alias 'sanpham' thay vì 'sanphams'
        attributes: [
          ['masp', 'type'], // Đổi tên cột thành 'type' để phù hợp với biểu đồ
          [Sequelize.fn('sum', Sequelize.col('soluong')), 'value'],
        ],
        group: ['masp'], // Sử dụng 'masp' thay vì 'masp' và 'sanpham.id'
      });
  
      const data = response.map(item => ({
        type: item.sanpham.tensp, // Sử dụng 'sanpham' thay vì 'sanphams'
        value: item.dataValues.value,
      }));
  
      res.status(200).json(data);
    } catch (error) {
      console.log(error.message);
    }
  };

// Tính tổng doanh thu
export const getTotalRevenue = async (req, res) => {
  try {
    const response = await Cthoadon.sum("tongtien");
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// Tính tổng doanh thu của ngày hôm nay
export const getTodayRevenue = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Lấy ngày hôm sau để làm điểm kết thúc

    const response = await Cthoadon.sum("tongtien", {
      where: {
        createdAt: {
          [Op.gte]: today,
          [Op.lt]: tomorrow,
        },
      },
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getCTHDByMahd = async (req,res) =>{
  try {
    const mahd = req.body.mahd;
    const cthds = await Cthoadon.findAll({where:{ mahd:mahd}});
    if (!cthds) {
      return res.status(404).json({ message: "Không tìm thấy cthoadon" });
    }
    res.status(200).json(cthds);
  } catch (error) {
    console.log(error.message);
  }
}

export const getCthoadonByMakh = async (req, res) => {
  try {
    const  {makh}  = req.params;

    const hoadons = await Hoadon.findAll({ where: { makh } });
    if (!hoadons) {
      return res.status(404).json({ message: "Không tìm thấy hoadon" });
    }

    const mahds = hoadons.map((hoadon) => hoadon.mahd);

    const cthoadons = await Cthoadon.findAll({ where: { mahd: mahds } });
    if (!cthoadons) {
      return res.status(404).json({ message: "Không tìm thấy cthoadon" });
    }

    res.status(200).json(cthoadons);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

export const getAllCthoadon = async (req, res) => {
  try {
    const cthoadon = await Cthoadon.findAll({
      order: [['mahd', 'ASC']],
    }
     
    )
    res.status(200).json(cthoadon);
  } catch (error) {
    console.log(error);
  }
}

export const delCTHoadon = async (req, res) => {
  try {
    const {mahd, masp} = req.params
     await Cthoadon.destroy({where :{
      mahd:mahd,
      masp:masp
    }})
    const check = await Cthoadon.findOne({
      where: {mahd:mahd}
    })
    if(!check){
      await Hoadon.destroy({where:{
        mahd:mahd
      }})
    }
    res.status(200).json({msg:"CTHoadon destroyed successfully"})
  } catch (error) {
    console.log(error);
  }
}

export const editCTHoadon = async (req, res) => {
  try {
      const {mahd, masp} = req.params
      await Cthoadon.update(
        {
          ...req.body,
          tongtien: req.body.soluong * req.body.dongia
        },
        {
          where: {
            mahd: mahd,
            masp: masp
          }
        }
      );
      const cthoadon = await Cthoadon.findAll({where:{
        mahd: mahd,
      }})
      const sumTongtien = cthoadon.reduce((acc, cartItem) => {
        return acc + cartItem.tongtien;
      }, 0);
      await Hoadon.update({
        tongtien : sumTongtien,
      },{
        where:{
          mahd:mahd
        }
      })
      res.status(200).json({ msg: " Updated" });
  } catch (error) {
      console.log(error.message);
  }
}

export const getCTHDByMahdnMasp = async (req, res) =>{
  try {
    const {mahd } = req.params;
    const {masp} = req.params;
    const cthds = await Cthoadon.findOne({where:{ 
      mahd:mahd,
      masp : masp
    }});
    if (!cthds) {
      return res.status(404).json({ message: "Không tìm thấy cthoadon" });
    }
    res.status(200).json(cthds);
  } catch (error) {
    console.log(error.message);
  }
}