import { ServiceType } from '../models/ServiceType.js'

// definitions graphql
export const typeDefs = `#graphql
  type ServiceType {
    id: Int!
    name: String!
    average_price_mw: Int!
    status: Boolean!
  }

  extend type Query {
    allServiceTypes: [ServiceType]
    serviceTypesCount: Int!
    findServiceType(name: String!): ServiceType
  }

  extend type Mutation {
   addServiceType(
        name: String!
        average_price_mw: Int!
        status: Boolean
   ): ServiceType
 }
`

// resolvers graphql
export const resolvers = {
  Query: {
    allServiceTypes: async () => {
      return await ServiceType.findAll({ order: [['name', 'ASC']] })
    },
    serviceTypesCount: async () => {
      return await ServiceType.count()
    },
    findServiceType: async (root, { name }) => {
      try {
        const service_type = await ServiceType.findOne({ where: { name } })
        if (!service_type) {
          throw new Error(`No ServiceType was found with the name: ${name}`)
        }
        return service_type
      } catch (err) {
        console.error(err)
        throw err
      }
    }
  },
  Mutation: {
    addServiceType: async (
      root,
      { name,average_price_mw }
    ) => {
      const service_type = await ServiceType.findOne({ where: { name } })
      if (service_type) {
        throw new Error('Service Type already exists')
      } else {
        return await ServiceType.create({name,average_price_mw})
      }
    }
  }
}
