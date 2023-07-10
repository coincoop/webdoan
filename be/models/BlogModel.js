

import {Sequelize} from "sequelize";
import db from "../config/Database.js";


const {DataTypes} = Sequelize;

const Blog = db.define('blogs',{
    idblog: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tenblog: DataTypes.STRING, 
    mota: DataTypes.STRING,    
    url: DataTypes.STRING,
    img_blog: DataTypes.STRING,
},{
    freezeTableName:true
});

export default Blog;

(async()=>{
    await db.sync();
})();
