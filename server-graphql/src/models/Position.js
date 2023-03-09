// table users
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Position = sequelize.define(
  'positions',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    key: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true
  }
)
