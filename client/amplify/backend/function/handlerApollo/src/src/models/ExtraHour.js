// table extra_hours
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
export const ExtraHour = sequelize.define(
  'extra_hours',
  {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    staff: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hours: {
      type: DataTypes.SMALLINT,
      allowNull: false
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
