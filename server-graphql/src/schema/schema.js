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
    hello: () => 'Hello world!, Welcome to app ecrsolar'
  }
}

export const resolvers = [
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
]

export const typeDefs = [
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
    Region

]
