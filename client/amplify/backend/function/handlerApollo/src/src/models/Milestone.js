// table extra_hours
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
export const Milestone = sequelize.define(
  'milestones',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    staff: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['staff', 'date']
      }
    ]
  }
)
