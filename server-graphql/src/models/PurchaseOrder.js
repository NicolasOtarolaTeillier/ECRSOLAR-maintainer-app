// table purchase_order
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const PurchaseOrder = sequelize.define('purchase_orders',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
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
        type: DataTypes.STRING, // to-do: definir modelo
        allowNull: false
    },
    central: {
        type: DataTypes.STRING, // to-do: definir modelo
        allowNull: false
    }
},
{
  timestamps: true
})