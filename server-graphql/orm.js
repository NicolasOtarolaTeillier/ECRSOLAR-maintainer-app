import { sequelize } from './src/database/database.js'

// import orm
import './src/models/Person.js'
import './src/models/User.js'
import './src/models/Role.js'
import './src/models/ServiceType.js'
import './src/models/Position.js'

// data default
import { Person } from './src/models/Person.js'
import { User } from './src/models/User.js'
import { Role } from './src/models/Role.js'
import { ServiceType } from './src/models/ServiceType.js'
import { Position } from './src/models/Position.js'


// asocciations
import './src/models/asocciations.js'

// ORM
async function orm () {
  try {
    await sequelize.sync({ force: true })
    //await sequelize.sync()
    await Role.bulkCreate([
      { role: 'admin', name: 'Administrador' },
      { role: 'operator',name: 'Operario' },
      { role: 'supervisor',name: 'Supervisor' },
      { role: 'client',name: 'Cliente' },
      { role: 'guest', name: 'Invitado' },
      { role: 'owner', name: 'Dueño' }
    ])
    await Person.bulkCreate([
      {
        email: 'admin@admin.cl',
        first_name: 'admin',
        last_name: 'admin',
        //phone_number: '+56912312387',
        //rut: '12.121.121.k',
        status: true
      },
      {
        email: 'admin@admi2n.cl',
        first_name: 'admin',
        last_name: 'admin',
        //phone_number: '+56912312387',
        //rut: '12.121.121.k',
        status: true
      }
    ])
    await User.bulkCreate([
      {person_id: 1, password: 'admin', role: 'admin', status: true },
      {person_id: 2, password: 'admin', role: 'admin', status: true },
    ])
    
    await ServiceType.bulkCreate([
      //{ name: 'Contratos O&M', status: true },
      { name: 'Correctivo complejo',average_price_mw: 1000, status: true },
      { name: 'Correctivo simple',average_price_mw: 1000, status: true },
      { name: 'Curva IV',average_price_mw: 1000, status: true },
      { name: 'Demalezado',average_price_mw: 1000, status: true },
      { name: 'Inspección técnica',average_price_mw: 1000, status: true },
      { name: 'Limpieza con agua',average_price_mw: 1000, status: true },
      { name: 'Limpieza en seco',average_price_mw: 1000, status: true },
      { name: 'Obras civiles',average_price_mw: 1000, status: true },
      { name: 'Termografía',average_price_mw: 1000, status: true }
    ])
    await Position.bulkCreate([
      {name: "Operario", key: 'operator'},
      {name: "Operario sénior", key: 'operator_senior'},
      {name: "Operario júnior", key: 'operator_junior'},
      {name: "Supervisor", key: 'supervisor'},
      {name: "Gerente de linea", key: 'line_manager'},
      {name: "Desarrollador de negocios", key: 'developer_business'},
      {name: "Programador", key: 'programmer'},
    ])


    // await Contact.bulkCreate([
    //   {email: 'daniel@ienergiachile.com', firstName: 'Daniel', lastName: 'Friedman', phoneNumber: '', address: 'Av Américo Vespucio 2680 Of 111, Conchalí, Santiago', status: true }
    // ])

    // await Client.bulkCreate([
    //   { email: 'daniel@ienergiachile.com', password: '123', firstName: 'Daniel', lastName: 'Friedman', role: 'client',phoneNumber: '+56966666451',address: 'Av Américo Vespucio 2680 Of 111, Conchalí, Santiago', status: true},
    //   { email: 'daniel2@ienergiachile.com', password: '123', firstName: 'Daniel', lastName: 'Friedman', role: 'client',phoneNumber: '+56966666451',address: 'Av Américo Vespucio 2680 Of 111, Conchalí, Santiago', status: true},
    // ])

    // await PurchaseOrder.bulkCreate([
    //   { name: 'OC_20230303_ECRSolar_Santuario_Cruz.pdf' , number : 20230303, date: "2023-03-03",client: "daniel@ienergiachile.com", status: 0 }
    // ])

    console.log('(sequelize) Connection has been established successfully.')
  } catch (error) {
    console.error('(sequelize) Unable to connect to the database:', error)
  }
}

orm()
