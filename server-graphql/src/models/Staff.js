// table users
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const User = sequelize.define(
  'staff',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    position: {
      type: DataTypes.STRING,
      foreingKey: true,
      allowNull: false,
    },
    person: {
      type: DataTypes.INTEGER,
      foreingKey: true,
      allowNull: false,
    },
    admission_date :{
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    completion_date :{
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    timestamps: true
  }
)
