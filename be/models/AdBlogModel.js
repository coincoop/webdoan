import {Sequelize} from 'sequelize';
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const AdBlog = db.define('blogs',{
    idblog: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tenblog: DataTypes.STRING,  
    img_blog: DataTypes.STRING,  
    mota: DataTypes.STRING,
    url: DataTypes.STRING,
},{
    freezeTableName:true
});

export default AdBlog;

(async()=>{
    await db.sync();
})();