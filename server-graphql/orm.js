import { sequelize } from './src/database/database.js'

 
// tables
import { ServiceType } from './src/models/ServiceType.js'
import { FunctionalArea } from  './src/models/FunctionalArea.js'
import { ProviderType } from './src/models/ProviderType.js'
import { Region } from './src/models/Region.js'
import { Person } from './src/models/Person.js'
import { Position } from './src/models/Position.js'
import { PhotovoltaicPowerStation } from './src/models/PhotovoltaicPowerStation.js'
import { Customer } from './src/models/Customer.js'
import { Contact } from './src/models/Contact.js'
import { Commune } from './src/models/Commune.js'
import { Provider } from './src/models/Provider.js'
import { Staff } from './src/models/Staff.js'
import { Productivity } from './src/models/Productivity.js'
import { ExtraHour } from './src/models/ExtraHour.js'
import { EquipmentCategory } from './src/models/EquipmentCategory.js'
import { ServiceXProvider } from './src/models/ServiceXProvider.js'
import { ServiceXStaff } from './src/models/ServiceXStaff.js'
import { ServiceTypeXPosition } from './src/models/ServiceTypeXPosition.js'
import { Service } from './src/models/Service.js'


// asocciations
import './src/models/asocciations.js'

// data default
import { serviceType } from './src/data/serviceType.js'
import { functionaArea } from './src/data/functionaArea.js'
import { providerType } from './src/data/providerType.js'
import { region } from './src/data/region.js'
import { person } from './src/data/person.js'
import { position } from './src/data/position.js'
import { photovoltaicPowerStation } from './src/data/photovoltaicPowerStation.js'
import { customer } from './src/data/customer.js'
import { contact } from './src/data/contact.js'
import { commune } from './src/data/commune.js'
import { provider } from './src/data/provider.js'
import { staff } from './src/data/staff.js'
import { productivity } from './src/data/productivity.js'
import { extraHour } from './src/data/extraHour.js'
import { equipmentCategory } from './src/data/equipmentCategory.js'
import { serviceXProvider } from './src/data/serviceXProvider.js'
import { serviceXStaff } from './src/data/serviceXStaff.js'
import { serviceTypeXPosition } from './src/data/serviceTypeXPosition.js'
import { service } from './src/data/service.js'

// ORM
async function orm () {
  try {
    await sequelize.sync({ force: true })
    //await sequelize.sync()
    
    // tablas primarias
    await ServiceType.bulkCreate(serviceType)
    await FunctionalArea.bulkCreate(functionaArea)
    await ProviderType.bulkCreate(providerType)
    await Region.bulkCreate(region)
    await Person.bulkCreate(person)
    await Position.bulkCreate(position)
    await EquipmentCategory.bulkCreate(equipmentCategory)

    // tablas secundarias
    await Customer.bulkCreate(customer)
    await PhotovoltaicPowerStation.bulkCreate(photovoltaicPowerStation)
    await Contact.bulkCreate(contact)
    await Commune.bulkCreate(commune)
    await Provider.bulkCreate(provider)
    await Staff.bulkCreate(staff)
    //await Productivity.bulkCreate(productivity)
    //await ExtraHour.bulkCreate(extraHour)      
    

    // tablas maestra
    await Service.bulkCreate(service)

    // tablas intermedias
    await ServiceXProvider.bulkCreate(serviceXProvider)
    await ServiceXStaff.bulkCreate(serviceXStaff)
    await ServiceTypeXPosition.bulkCreate(serviceTypeXPosition)


    console.log('(sequelize) Connection has been established successfully.')
  } catch (error) {
    console.error('(sequelize) Unable to connect to the database:', error)
  }
}

orm()



    // await Role.bulkCreate([
    //   { role: 'admin', name: 'Administrador' },
    //   { role: 'operator',name: 'Operario' },
    //   { role: 'supervisor',name: 'Supervisor' },
    //   { role: 'client',name: 'Cliente' },
    //   { role: 'guest', name: 'Invitado' },
    //   { role: 'owner', name: 'Dueño' }
    // ])

    // await User.bulkCreate([
    //   {person: 1, password: 'admin', role: 'admin', status: true },
    //   {person: 2, password: 'admin', role: 'admin', status: true },
    // ])
    


    // await Staff.bulkCreate([
    //   {person: 3, position: "operator", admission_date: '02-02-2023', status: true} 
    // ])
    // await ProductType.bulkCreate([
    //   {type: "tipo1", name: "Tipo1"},
    //   {type: "tipo2", name: "Tipo2"},

    // ])