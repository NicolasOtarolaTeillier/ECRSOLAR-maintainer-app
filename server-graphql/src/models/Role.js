// table roles
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Role = sequelize.define(
  'roles',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    role: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: true
  }
)
