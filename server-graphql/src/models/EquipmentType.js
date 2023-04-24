// table equipments
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Equipment = sequelize.define(
  'equipments',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
)
