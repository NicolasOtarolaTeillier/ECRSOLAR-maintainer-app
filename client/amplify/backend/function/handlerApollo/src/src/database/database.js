import Sequelize from 'sequelize'

// ORM
export const sequelize = new Sequelize("app-ecrsolar", "postgres", "ECRS0L4R61254872", {
    host: "db-ecrsolar-v3.cb5omus9e06e.us-east-1.rds.amazonaws.com",
    dialect: "postgres",
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
  
  
    

// "graphql": "^16.6.0",
// "graphql-scalars": "^1.20.1",
// "graphql-tools": "^8.3.16",
// "knex": "^2.4.2",
// "pg": "^8.8.0",
// "pg-hstore": "^2.3.4",
// "sequelize": "^6.28.0",
// "serverless": "^3.28.1"