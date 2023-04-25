// table equipment_categories
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const EquipmentCategory = sequelize.define(
  'equipment_categories',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
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
