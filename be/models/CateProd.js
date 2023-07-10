import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const CateProd = db.define('cateprod',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    stt: {
        type: DataTypes.INTEGER,
    },
    ten: DataTypes.STRING,
    url: DataTypes.STRING,
},{
    freezeTableName:true
});

export default CateProd;

(async()=>{
    await db.sync();
})();
