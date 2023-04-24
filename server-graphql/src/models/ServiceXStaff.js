// table service_x_staff
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
export const ServiceXStaff = sequelize.define(
  'service_x_staffs',
  {
    service: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: 'service_x_staffs_unique',
    },
    staff: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'service_x_staffs_unique',
    },
    leader: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },
  {
    timestamps: true
  }
)
