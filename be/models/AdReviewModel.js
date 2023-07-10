import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Product from "./ProductModel.js";
import User from "./User.js";

const { DataTypes } = Sequelize;

const AdReview = db.define(
  "review",
  {
    makh: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: User,
        key: "makh",
      },
    },
    masp: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Product,
        key: "masp",
      },
    },
    danhgia: DataTypes.FLOAT,
    noidung: DataTypes.TEXT,
    reply: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
  },
  {
    freezeTableName: true,
  }
);

AdReview.belongsTo(User, { foreignKey: "makh" });
AdReview.belongsTo(Product, { foreignKey: "masp" });

export default AdReview;

(async () => {
  await db.sync();
})();
