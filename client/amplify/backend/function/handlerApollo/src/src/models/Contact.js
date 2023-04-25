// table clients
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Contact = sequelize.define(
  'contacts',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    customer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
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
    // address: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    //   validate: {
    //     notEmpty: true,
    //   }
    // },
    functional_area:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  },
  {
    timestamps: true
  }
)

