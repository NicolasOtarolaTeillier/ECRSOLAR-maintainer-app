import { Service } from '../models/ServiceType.js'

// definitions graphql
export const typeDefs = `#graphql

  type Service {
    id: Int!              # (ejemplo: 1)
    name: String!         # (ejemplo: Correctivo)
    status: Boolean!      # (estados: true,false)
  }

  extend type Query {
    allServices: [Service]
    servicesCount: Int!
    findService(name: String!): Service
  }

 extend type Mutation {
   addService(
       name: String!
   ): Service
 }
`

// resolvers graphql
export const resolvers = {
  Query: {
    allServices: async () => {
      return await Service.findAll({order: [['name', 'ASC']]})
    },
    servicesCount: async () => {
      return await Service.count()
    },
    findService: async (root, { name }) => {
      try {
        const service = await Service.findOne({ where: { name } })
        if (!service) {
          throw new Error(`No service was found with the name: ${name}`)
        }
        return service
      } catch (err) {
        console.error(err)
        throw err
      }
    }
  },
  Mutation: {
    addService: async (
      root,
      { name }
    ) => {
      const service = await Service.findOne({ where: { name } })
      if (service) {
        throw new Error('Service already exists')
      } else {
        const newService = await Service.create({
          name
        })
        return newService
      }
    }
  }
}
