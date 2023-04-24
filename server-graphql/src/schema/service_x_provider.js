import { Provider } from '../models/Provider.js'
import { ServiceXProvider } from '../models/ServiceXProvider.js'
import { Service } from '../models/Service.js'

// definitions graphql
export const typeDefs = `#graphql

type NewServiceXProvider {
    service: ID!
    provider: Int!
    status: Boolean
}

type ServiceXProvider {
    service: Service!
    provider: Provider!
    status: Boolean!
}

extend type Query {
    allServiceXProvider: [ServiceXProvider!]
}

extend type Mutation {
    addServiceXProvider(
        service: ID!
        provider: Int!
        status: Boolean
    ): NewServiceXProvider!
}
`

// resolvers graphql

export const resolvers = {
  Query: {
    allServiceXProvider: async () => {
      return await ServiceXProvider.findAll()
    }
  },
  Mutation: {
    addServiceXProvider: async (root, { service, provider }) => {
      return await ServiceXProvider.create({
        service,
        provider
      })
    }
  },
  ServiceXProvider: {
    provider: async ({ provider }) => {
      return await Provider.findOne({
        where: { id: provider }
      })
    },
    service: async ({ service }) => {
        return await Service.findOne({
          where: { id: service }
        })
    }
  }
}
