// table products
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Products = sequelize.define(
  'products',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imported:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
  },
  {
    timestamps: true
  }
)
