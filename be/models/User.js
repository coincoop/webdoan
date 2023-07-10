import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const User = db.define('user',{
    makh: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tenkh: DataTypes.STRING,
    username: DataTypes.STRING,
    matkhau: DataTypes.STRING,
    email: DataTypes.STRING,
    diachi: DataTypes.STRING,
    sodienthoai:DataTypes.STRING,
    vaitro: {
        type :DataTypes.INTEGER,
        default: 0
    },
    resetCode : {
        type : DataTypes.INTEGER,

    }
},{
    freezeTableName:true
});

export default User;

(async()=>{
    await db.sync();
})();