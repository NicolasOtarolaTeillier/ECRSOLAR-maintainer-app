// table persons
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Region = sequelize.define(
  'regions',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    number: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      unique: true
    }
  },
  {
    timestamps: true
  }
)
