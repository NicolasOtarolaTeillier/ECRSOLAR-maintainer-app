
// tables, queries and mutations
import { typeDefs as ServiceType, resolvers as ServiceTypeResolvers } from './service_type.js'
import { typeDefs as Service, resolvers as ServiceResolvers } from './service.js'
import { typeDefs as Customer, resolvers as CustomerResolvers } from './customer.js'
import { typeDefs as PhotovoltaicPowerStation, resolvers as PhotovoltaicPowerStationResolvers } from './photovoltaic_power_station.js'
import { typeDefs as Contact, resolvers as ContactResolvers } from './contact.js'
import { typeDefs as FuncionalArea, resolvers as FuncionalAreaResolvers } from './functional_area.js'
import { typeDefs as Person, resolvers as PersonResolvers } from './person.js'
import { typeDefs as ProviderType, resolvers as ProviderTypeResolvers } from './provider_type.js'
import { typeDefs as Provider, resolvers as ProviderResolvers } from './provider.js'
import { typeDefs as ServiceXProvider, resolvers as ServiceXProviderResolvers } from './service_x_provider.js'
import { typeDefs as Commune, resolvers as CommuneResolvers } from './commune.js'
import { typeDefs as Region, resolvers as RegionResolvers } from './region.js'
import { typeDefs as Staff, resolvers as StaffResolvers } from './staff.js'
import { typeDefs as Position, resolvers as PositionResolvers } from './position.js'
import { typeDefs as Equipment, resolvers as EquipmentResolvers } from './equipment.js'
import { typeDefs as ServiceXEquipment, resolvers as ServiceXEquipmentResolvers } from './service_x_equipment.js'
import { typeDefs as EquipmentCategory, resolvers as EquipmentCategoryResolvers } from './equipment_category.js'
import { typeDefs as ServiceXStaff, resolvers as ServiceXStaffResolvers } from './service_x_staff.js'
import { typeDefs as Car, resolvers as CarResolvers } from './car.js'
import { typeDefs as ServiceXCar, resolvers as ServiceXCarResolvers } from './service_x_car.js'

// transaccions, mutations
import { typeDefs as ServicePlanning, resolvers as ServicePlanningResolver } from './transactions/servicePlanning.js'
const Transaccions = [ServicePlanning]
const TransaccionResolvers = [ServicePlanningResolver]

const rootTypeDefs = `#graphql
    type Query {
        _: String,
        hello: String
    }

    type Mutation {
        _: String
    }
`

const rooResolvers = {
  Query: {
    hello: () => 'Hello world!, Welcome to api ecrsolar'
  }
}

export const resolvers = [
  ...TransaccionResolvers,
  rooResolvers,
  ServiceTypeResolvers,
  ServiceResolvers,
  CustomerResolvers,
  PhotovoltaicPowerStationResolvers,
  ContactResolvers,
  FuncionalAreaResolvers,
  PersonResolvers,
  ProviderTypeResolvers,
  ProviderResolvers,
  ServiceXProviderResolvers,
  CommuneResolvers,
  RegionResolvers,
  StaffResolvers,
  PositionResolvers,
  EquipmentResolvers,
  ServiceXEquipmentResolvers,
  EquipmentCategoryResolvers,
  ServiceXStaffResolvers,
  CarResolvers,
  ServiceXCarResolvers
]

export const typeDefs = [
  ...Transaccions,
  rootTypeDefs,
  ServiceType,
  Service,
  Customer,
  PhotovoltaicPowerStation,
  Contact,
  FuncionalArea,
  Person,
  ProviderType,
  Provider,
  ServiceXProvider,
  Commune,
  Region,
  Staff,
  Position,
  ServiceXEquipment,
  Equipment,
  EquipmentCategory,
  ServiceXStaff,
  Car,
  ServiceXCar
]
