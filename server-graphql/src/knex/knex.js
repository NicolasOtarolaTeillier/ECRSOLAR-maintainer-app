import Knex from 'knex'

// builder sql
export const knex = Knex({
  client: 'pg',
  connection: {
    host: 'db-ecrsolar-v3.cb5omus9e06e.us-east-1.rds.amazonaws.com',
    port: 5432,
    user: 'postgres',
    password: 'ECRS0L4R61254872',
    database: 'test',
  }
})