import config from './config.json'

export const $DB_KNEX = () => config.db_knex
export const $DB_SEQUELIZE = () => config.db_sequelize
export const $security = () => config.security
export const $serverPort = () => config.serverPort
