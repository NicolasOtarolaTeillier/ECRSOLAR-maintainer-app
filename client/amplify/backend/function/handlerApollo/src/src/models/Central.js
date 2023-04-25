// table purchase_order
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const PurchaseOrder = sequelize.define('centrals',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
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