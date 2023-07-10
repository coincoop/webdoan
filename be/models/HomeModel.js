import {Sequelize} from 'sequelize';
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Home = db.define('home',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ten: DataTypes.STRING, 
    imghead: DataTypes.STRING, 
    imgfoot: DataTypes.STRING, 
    sdt: DataTypes.STRING,
    diachi: DataTypes.STRING,
    gmail: DataTypes.STRING,
    imgslide: DataTypes.STRING,
 
    mota: DataTypes.STRING,
    motaFooter: DataTypes.STRING,
    status: DataTypes.INTEGER,
},{
    freezeTableName:true
});

export default Home;

(async()=>{
    await db.sync();
})();