
// table clients
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const User = sequelize.define(
  'clients',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email'
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
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
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: /^\+?\d{10,14}$/,
          msg: 'Invalid phone number'
        }
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    timestamps: true
  }
)
