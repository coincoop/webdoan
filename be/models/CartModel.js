import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Cart = db.define('cart',{
    makh: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    masp: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    quantity: DataTypes.INTEGER,
},{
    freezeTableName:true
});

export default Cart;

(async()=>{
    await db.sync();
})();
