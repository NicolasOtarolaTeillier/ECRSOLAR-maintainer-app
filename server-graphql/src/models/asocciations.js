import { User } from './User.js'
import { Role } from './Role.js';

// cada usuario tiene asociado un solo rol
User.belongsTo(Role, { foreignKey: 'role', as: 'role_id' });
// cada rol puede estar asociado a muchos usuarios
Role.hasMany(User, { foreignKey: 'role' })