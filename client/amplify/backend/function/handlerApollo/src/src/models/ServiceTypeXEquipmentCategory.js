// table service_type_x_equipment_categories
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const ServiceTypeXEquipmentCategory = sequelize.define(
  'service_type_x_equipment_categories',
  {
    service_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    equipment_category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    count :{
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
