import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Hoadon = db.define('hoadon',{
    mahd: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    makh: DataTypes.INTEGER,
    tongtien: DataTypes.INTEGER,
    email: DataTypes.STRING,
    diachi: DataTypes.STRING,
    sodienthoai:DataTypes.STRING,
    tinhtrang: DataTypes.INTEGER,
},{
    freezeTableName:true
});

export default Hoadon;

(async()=>{
    await db.sync();
})();
