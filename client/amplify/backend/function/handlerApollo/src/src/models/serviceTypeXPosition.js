// table service_type_x_positions
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const ServiceTypeXPosition = sequelize.define(
  'service_type_x_positions',
  {
    service_type: {
      type: DataTypes.STRING,
      allowNull: false

    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    count: {
        type: DataTypes.INTEGER, 
      allowNull: false

    }
  },
  {
    timestamps: true
  }
)
