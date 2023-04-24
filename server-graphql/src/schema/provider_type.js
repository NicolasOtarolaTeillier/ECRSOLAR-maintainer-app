import { ProviderType } from '../models/ProviderType.js'

// definitions graphql
export const typeDefs = `#graphql


type ProviderType {
    id: Int!
    name: String!
    status: Boolean!
}

extend type Query {
    allProviderType: [ProviderType!]
}

extend type Mutation {
    addProviderType(
        name: String!
    ): ProviderType
}
`
// resolvers graphql

export const resolvers = {
  Query: {
    allProviderType: async () => {
      return await ProviderType.findAll()
    }
  },
  Mutation: {
    addProvider: async (root, { name }) => {
      return await ProviderType.crate({
        name
      })
    }
  }
}
