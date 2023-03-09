// table purchase_order
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Company = sequelize.define('companies',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,        
    },
    fantasy_name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,        
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rut: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          is: {
            args: /^(\d{1,3}(?:\.?\d{3}){2}-[\dkK])$/,
            msg: 'Invalid RUT'
          }
        }
      },
    owner: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
  timestamps: true
})