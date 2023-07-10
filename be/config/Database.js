import {Sequelize} from "sequelize";

const db = new Sequelize('postgres', 'postgres', 'Thanhtung123!', {
    host: 'db.pcxpubgkjwkxkkqpecji.supabase.co',
    dialect: 'postgres',
  });

export default db;

// import {Sequelize} from "sequelize";

// const db = new Sequelize('menureact','root','',{
//     host: 'localhost',
//     dialect: 'mysql'
// });

// export default db;