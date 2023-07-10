import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Product from "./ProductModel.js";
const {DataTypes} = Sequelize;

const Menu = db.define('menus',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,    
    parent_id: DataTypes.INTEGER,
    img: DataTypes.INTEGER,
    url: DataTypes.STRING,
},{
    freezeTableName:true
});

export default Menu;

(async()=>{
    await db.sync();
})();