import { Person } from './Person.js'
import { User } from './User.js'
import { Role } from './Role.js';
import { ServiceType } from './ServiceType.js';

// 1-1
// una persona tiene un usuario
Person.hasOne(User, { foreignKey: 'person_id' })
// un usuario pertenece a una persona
User.belongsTo(Person,{ foreignKey: 'person_id'}); 



// 1-n
// un rol tiene muchos usuarios
Role.hasMany(User, { foreignKey: 'role' })
// un usuario pertenece a un role
User.belongsTo(Role, { foreignKey: 'role', as: 'role_id' });



// // cada cliente tiene asociado un solo rol
// Client.belongsTo(Role, { foreignKey: 'role', as: 'role_id' });
// // cada rol puede estar asociado a muchos clientes
// Role.hasMany(Client, { foreignKey: 'role' })