// table functional_area
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const FunctionalArea = sequelize.define(
  'functional_areas',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
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
