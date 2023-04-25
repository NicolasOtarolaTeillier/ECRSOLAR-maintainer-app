// table equipments
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Equipment = sequelize.define(
  'equipments',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    equipment_category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    timestamps: true
  }
)
