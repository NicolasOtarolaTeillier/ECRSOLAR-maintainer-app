// table users
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    person_id: {
      type: DataTypes.INTEGER,
      foreingKey: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'guest'
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    timestamps: true
  }
)
