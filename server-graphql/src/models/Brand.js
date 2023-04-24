// table equipments
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const brand = sequelize.define(
  'brands',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    brand: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
)
