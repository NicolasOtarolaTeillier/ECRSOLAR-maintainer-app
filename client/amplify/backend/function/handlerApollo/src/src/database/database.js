import Sequelize from 'sequelize'
import dotenv from 'dotenv';

dotenv.config({ silent: true });
// ORM

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: 20,
      min: 5,
      acquire: 15000,
      idle: 5000
    }
  }
);
  

// import Sequelize from 'sequelize'
// // ORM

// export const sequelize = new Sequelize(
//   "app-ecrsolar",
//   "postgres",
//   "ECRS0L4R61254872",
//   {
//     host: "db-ecrsolar-v3.cb5omus9e06e.us-east-1.rds.amazonaws.com",
//     dialect: "postgres",
//     pool: {
//       max: 20,
//       min: 5,
//       acquire: 15000,
//       idle: 5000
//     }
//   }
// );
  