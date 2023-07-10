import {Sequelize} from 'sequelize';
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const AdCateProd= db.define('cateprod',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    stt: DataTypes.INTEGER,    
    ten: DataTypes.STRING,
    url: DataTypes.STRING,
},{
    freezeTableName:true
});

export default AdCateProd;

(async()=>{
    await db.sync();
})();