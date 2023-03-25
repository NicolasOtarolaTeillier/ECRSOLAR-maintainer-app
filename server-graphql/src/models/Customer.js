// table clients
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Customer = sequelize.define(
  'customers',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    name: { // razon social
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false
    },
    fantasy_name: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false
    },
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: /^(\d{1,3}(?:\.?\d{3}){2}-[\dkK])$/,
          msg: 'Invalid RUT'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
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

