// table photovoltaic_power_stations
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const PhotovoltaicPowerStation = sequelize.define(
  'photovoltaic_power_stations',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    strings: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    modules: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    module_size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hectares: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    investor_brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    module_brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mw: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    manager_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customer: {
      type: DataTypes.STRING,
      allowNull: false  
    },
    manager_number: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: {
            args: /^\+?\d{10,14}$/,
            msg: 'Invalid phone number'
          }
        }
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
