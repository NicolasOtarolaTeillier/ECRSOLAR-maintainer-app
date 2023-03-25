import { ServiceType } from './ServiceType.js';
import { Service } from './Service.js';
import { Customer } from './Customer.js'
import { PhotovoltaicPowerStation } from './PhotovoltaicPowerStation.js';
import { Contact } from './Contact.js';
import { FunctionalArea } from './FunctionalArea.js';
import { Person } from './Person.js'
import { ProviderType } from './ProviderType.js'
import { Provider } from './Provider.js'
import { Position } from './Position.js';
import { Staff } from './Staff.js';
import { Productivity } from './Productivity.js';
import { Region } from './Region.js';
import { Commune } from './Commune.js';
import { ExtraHour } from './ExtraHour.js';



///////////////////////////// CONTACT ////////////////////////////////
// 1-n
// un Cliente tiene muchos contactos
Customer.hasMany(Contact, { foreignKey: 'customer' })
// una Contacto pertenece a un cliente
Contact.belongsTo(Customer, { foreignKey: 'customer', as: 'customer_id' });

// 1-n
// un Cliente tiene muchos contactos
FunctionalArea.hasMany(Contact, { foreignKey: 'functional_area' })
// una Contacto pertenece a un cliente
Contact.belongsTo(FunctionalArea, { foreignKey: 'functional_area', as: 'functional_area_id' });



///////////////////////////// PHOTOVOLTAIC_POWER_STATION ////////////////////////////////
// 1-n
// un Cliente tiene muchas plantas
Customer.hasMany(PhotovoltaicPowerStation, { foreignKey: 'customer' })
// una Planta pertenece a un cliente
PhotovoltaicPowerStation.belongsTo(Customer, { foreignKey: 'customer', as: 'customer_id' });



///////////////////////////// PROVIDER ////////////////////////////////
// 1-n
// un tipo de proveedor  tiene muchos proveedores 
ProviderType.hasMany(Provider, { foreignKey: 'provider_type' })
// un proveedores  pertenece a un tipo de tipo de proveedor 
Provider.belongsTo(ProviderType, { foreignKey: 'provider_type', as: 'provider_type_id' });

// 1-n
// un Comuna tiene muchas proveedores
Commune.hasMany(Provider, { foreignKey: 'commune' })
// una Proveedor pertenece a una comuna
Provider.belongsTo(Commune, { foreignKey: 'commune', as: 'commune_id' });



///////////////////////////// STAFF ////////////////////////////////
// 1-n
// un cargo tiene mucho personal
Position.hasMany(Staff, { foreignKey: 'position' })
// un personal pertenece a un cargo
Staff.belongsTo(Position, { foreignKey: 'position', as: 'position_id' });

// 1-n
// un cargo tiene mucho personal
Person.hasMany(Staff, { foreignKey: 'person' })
// un personal pertenece a un cargo
Staff.belongsTo(Person, { foreignKey: 'person', as: 'person_id' });



///////////////////////////// PRODUCTIVITY ////////////////////////////////
// 1-n
// un personal tiene muchos productividades asociados
Staff.hasMany(Productivity, { foreignKey: 'staff' })
// una Productividad pertenece a un unico personal
Productivity.belongsTo(Staff, { foreignKey: 'staff', as: 'staff_id' });



///////////////////////////// EXTRAHOUR ////////////////////////////////
// 1-n
// un personal tiene muchoas horas extras asociados
Staff.hasMany(ExtraHour, { foreignKey: 'staff' })
// una Hora extra pertenece a un unico personal
ExtraHour.belongsTo(Staff, { foreignKey: 'staff', as: 'staff_id' });



///////////////////////////// COMMUNE  ////////////////////////////////
// 1-n
// una Region tiene muchos comunas asociadas
Region.hasMany(Commune, { foreignKey: 'region' })
// una Comuna pertenece a una unica region
Commune.belongsTo(Region, { foreignKey: 'region', as: 'region_id' });



///////////////////////////// SERVICE //////////////////////////////// (rojo)
// 1-n
// un tipo de servicio tiene muchos servicios
ServiceType.hasMany(Service, { foreignKey: 'service_type' })
// un servicio pertenece a un tipo de servicio
Service.belongsTo(ServiceType, { foreignKey: 'service_type', as: 'service_type_id' });

// 1-n
// un cliente tiene muchos servicios
Customer.hasMany(Service, { foreignKey: 'customer' })
// un servicio pertenece a un tipo de cliente
Service.belongsTo(Customer, { foreignKey: 'customer', as: 'customer_id' });

// 1-n
// una Planta tiene muchos servicios asociados
PhotovoltaicPowerStation.hasMany(Service, { foreignKey: 'photovoltaic_power_station' })
// una Servicio pertenece a una unica Planta
Service.belongsTo(PhotovoltaicPowerStation, { foreignKey: 'photovoltaic_power_station', as: 'photovoltaic_power_station_id' });

// 1-n
// un Contacto tiene muchos servicios asociados
Contact.hasMany(Service, { foreignKey: 'contact' })
// una Servicio pertenece a un unico contacto
Service.belongsTo(Contact, { foreignKey: 'contact', as: 'contact_id' });




///////////////////////////// TABLAS INTERMEDIAS //////////////////////////////// (azul)
import { ServiceXProvider } from './ServiceXProvider.js'
// 1-n
// un Servicio tiene muchos proveedores  por servicio
Service.hasMany(ServiceXProvider, { foreignKey: 'service' });
// un proveedores  por servicio  pertenece a un Servicio 
ServiceXProvider.belongsTo(Service, {foreignKey: 'service', as: 'service_id'});

// 1-n
// un Provedor  tiene muchos Proveedores  por servicio
Provider.hasMany(ServiceXProvider, { foreignKey: 'provider' });
// un proveedores  por servicio  pertenece a un Provedor 
ServiceXProvider.belongsTo(Provider, {foreignKey: 'provider', as: 'provider_id'});


import { ServiceTypeXPosition } from './ServiceTypeXPosition.js'
// 1-n
// un cargo tiene muchos Tipos de servicios por cargos
Position.hasMany(ServiceTypeXPosition, { foreignKey: 'position' });
// un Tipos de servicios por cargos  pertenece a un cargo 
ServiceTypeXPosition.belongsTo(Position, {foreignKey: 'position', as: 'position_id'});

// 1-n
// un tipo de servicio  tiene muchos Tipos de servicios por cargos
ServiceType.hasMany(ServiceTypeXPosition, { foreignKey: 'service_type' });
// un Tipos de servicios por cargos  pertenece a un tipo por servicio 
ServiceTypeXPosition.belongsTo(ServiceType, {foreignKey: 'service_type', as: 'service_type_id'});


import { ServiceXStaff } from './ServiceXStaff.js'
// 1-n
// un cargo tiene muchos Tipos de servicios por cargos
Service.hasMany(ServiceXStaff, { foreignKey: 'service' });
// un Tipos de servicios por cargos  pertenece a un cargo 
ServiceXStaff.belongsTo(Service, {foreignKey: 'service', as: 'service_id'});

// 1-n
// un tipo de servicio  tiene muchos Tipos de servicios por cargos
Staff.hasMany(ServiceXStaff, { foreignKey: 'staff' });
// un Tipos de servicios por cargos  pertenece a un tipo por servicio 
ServiceXStaff.belongsTo(Staff, {foreignKey: 'staff', as: 'staff_id'});




//////////////////////////////////////////////////////////////////////////////////////////






















import { User } from './User.js'
import { Role } from './Role.js';



// 1-1
// una persona tiene un usuario
Person.hasOne(User, { foreignKey: 'person' })
// un usuario pertenece a una persona
User.belongsTo(Person,{ foreignKey: 'person', as: 'person_id'}); 


// 1-n
// un rol tiene muchos usuarios
Role.hasMany(User, { foreignKey: 'role', })
// un usuario pertenece a un role
User.belongsTo(Role, { foreignKey: 'role', as: 'role_id' });





// // cada cliente tiene asociado un solo rol
// Client.belongsTo(Role, { foreignKey: 'role', as: 'role_id' });
// // cada rol puede estar asociado a muchos clientes
// Role.hasMany(Client, { foreignKey: 'role' })