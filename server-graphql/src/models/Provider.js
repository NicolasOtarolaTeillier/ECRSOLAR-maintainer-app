// table persons
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'


export const Provider = sequelize.define(
  'providers',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email'
        }
      }
    },
    provider_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rut: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: {
            args: /^(\d{1,3}(?:\.?\d{3}){2}-[\dkK])$/,
            msg: 'Invalid RUT'
          }
        }
      },
    fantasy_name: {
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
    provider_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quality: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false
    }, 
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false
    },
    commune:{
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
)
