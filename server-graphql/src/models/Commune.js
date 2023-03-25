// table persons
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'


export const Commune = sequelize.define(
  'communes',
  {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
    region:{
        type: DataTypes.STRING,
        allowNull: false
    }
    
  },
  {
    timestamps: true
  }
)
