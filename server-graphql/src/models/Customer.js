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
    name: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false
    },
    fantasyName: {
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

