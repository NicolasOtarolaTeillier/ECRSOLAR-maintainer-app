// table roles
import { Sequelize,DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Report = sequelize.define(
  'reports',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    data_day: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    data_month: {
      type: DataTypes.JSONB,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
)
