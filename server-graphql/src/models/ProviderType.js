// table persons
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const ProviderType = sequelize.define(
  'provider_types',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
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
