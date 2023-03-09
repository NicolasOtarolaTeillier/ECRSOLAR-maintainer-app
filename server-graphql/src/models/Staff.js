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
    person_id: {
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
