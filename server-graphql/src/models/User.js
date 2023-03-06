// table users
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const User = sequelize.define(
  'users',
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
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  },
  {
    timestamps: true
  }
)
