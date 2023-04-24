// table persons
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const ServiceXProvider = sequelize.define(
  'service_x_providers',
  {
    service: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    provider: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
