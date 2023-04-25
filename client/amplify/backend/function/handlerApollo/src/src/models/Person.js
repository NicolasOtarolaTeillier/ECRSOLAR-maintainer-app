// table persons
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Person = sequelize.define(
  'persons',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email'
        }
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: /^\+?\d{10,14}$/,
          msg: 'Invalid phone number'
        }
      }
    },
    rut: {
      type: DataTypes.STRING,
      allowNull: true,
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
      defaultValue: true
    }
  },
  {
    timestamps: true
  }
)
