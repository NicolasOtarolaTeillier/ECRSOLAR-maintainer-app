// table purchase_order
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const PurchaseOrder = sequelize.define('purchase_orders',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,        
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    client: {
        type: DataTypes.STRING,
        allowNull: false
    },

    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
  timestamps: true
})