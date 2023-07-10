
import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Product from "./ProductModel.js";

const {DataTypes} = Sequelize;

const Review = db.define('review',{
    makh: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    masp: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    danhgia: DataTypes.FLOAT,
    noidung: DataTypes.TEXT,
    reply: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
},{
    freezeTableName:true
});
Review.belongsTo(Product, { foreignKey: "masp" });

export default Review;

(async()=>{
    await db.sync();
})();