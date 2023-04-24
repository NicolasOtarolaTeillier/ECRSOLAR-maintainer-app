import Sequelize from 'sequelize'
import dotenv from 'dotenv'

// Configuración de dotenv
dotenv.config()

// ORM
export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
})


  // import { Sequelize } from "sequelize";
  // import { $DB_SEQUELIZE } from "../../db";
  // const {host,port,user,password,database,dialect,operatorsAliases,pool} = $DB_SEQUELIZE()
  // const sequelize = new Sequelize(database, user, password, {
  //     host: host,
  //     dialect: dialect,
  //     operatorsAliases: operatorsAliases,
  //     pool: pool
  //   })
  
  
    