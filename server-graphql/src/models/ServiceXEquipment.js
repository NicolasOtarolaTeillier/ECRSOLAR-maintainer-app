// table service_x_equipment
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const ServiceXEquipment = sequelize.define(
  'service_x_equipments',
  {
    service: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: 'service_x_equipments_unique',

    },
    equipment: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'service_x_equipments_unique',

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
