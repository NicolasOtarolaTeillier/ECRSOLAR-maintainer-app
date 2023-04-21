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
    strings: { // cantidad de filas
      type: DataTypes.INTEGER,
      allowNull: true
    },
    modules: { // cantidad de paneles
      type: DataTypes.INTEGER,
      allowNull: true
    },
    module_size: { // estructura
      type: DataTypes.STRING,
      allowNull: true
    },
    hectares: { // tamaño de terreno
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    investor_brand: {
      type: DataTypes.STRING,
      allowNull: true
    },
    module_brand: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mw_ac: {  // ac output
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    mw_dc: {  // dc / mwpick / capacidad instalada 
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: true
    },
    manager_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    customer: {
      type: DataTypes.STRING,
      allowNull: true  
    },
    commune: {
      type: DataTypes.STRING,
      allowNull: true  
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
