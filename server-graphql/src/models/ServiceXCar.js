// table service_x_cars
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const ServiceXCar = sequelize.define(
  'service_x_cars',
  {
    service: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: 'service_x_cars_unique',
    },
    car: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'service_x_cars_unique',

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
