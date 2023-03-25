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
    product: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
)
