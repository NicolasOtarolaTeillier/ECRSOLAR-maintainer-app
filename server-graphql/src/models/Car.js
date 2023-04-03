// table cars
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
// to-do: remove id
export const Car = sequelize.define(
  'cars',
  {
    color: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    make: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    license_plate: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        is: /^[A-Za-z0-9]+$/i, // Asegura que la patente solo contenga letras y números
        len: [4, 10], // Establece una longitud mínima y máxima para la patente
      },
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
