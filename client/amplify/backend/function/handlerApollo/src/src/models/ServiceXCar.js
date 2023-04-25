// table service_x_cars
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const ServiceXCar = sequelize.define(
  'service_x_cars',
  {
    service: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    car: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['service', 'car']
      }
    ]
  }
)
