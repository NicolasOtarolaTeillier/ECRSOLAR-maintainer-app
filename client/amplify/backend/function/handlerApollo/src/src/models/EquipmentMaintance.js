// table equipments
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Equipment = sequelize.define(
  'equipments',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    equipment: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
    }
  },
  {
    timestamps: true
  }
)
