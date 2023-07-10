import {Sequelize} from 'sequelize';
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const AdMenu = db.define('menus',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,    
    parent_id: DataTypes.INTEGER,
    img: DataTypes.STRING, 
    url: DataTypes.STRING,
},{
    freezeTableName:true
});

export default AdMenu;

(async()=>{
    await db.sync();
})();