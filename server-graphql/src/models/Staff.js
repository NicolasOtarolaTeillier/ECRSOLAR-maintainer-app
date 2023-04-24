// table staffs
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Staff = sequelize.define(
  'staffs',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    person: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admission_date :{
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    dismissal_date :{
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status :{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      
    }
  },
  {
    timestamps: true
  }
)
