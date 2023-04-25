// table users
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const DocumentType = sequelize.define(
  'document_types',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    key: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true
  }
)
