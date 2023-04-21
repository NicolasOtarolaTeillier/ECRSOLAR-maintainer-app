// table services
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Service = sequelize.define(
  'services',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    purchase_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contract:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    proposed_execution_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    finish_execution_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    service_type:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    photovoltaic_power_station: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    step: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },
  {
    timestamps: true
  }
)
