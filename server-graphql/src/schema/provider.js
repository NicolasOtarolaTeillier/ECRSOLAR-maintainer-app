import { ProviderType } from '../models/ProviderType.js'
import { Provider } from '../models/Provider.js'
import { Commune } from '../models/Commune.js'

// definitions graphql
export const typeDefs = `#graphql

type NewProvider {
    id: Int!
    email: String
    provider_name: String!
    name: String!
    rut: String
    fantasy_name: String!
    phone_number: String
    provider_type: String!
    quality: String!
    latitude: Float!
    longitude: Float!
    commune: String!
    status: Boolean!
}

type Provider {
    id: Int!
    email: String
    provider_name: String!
    name: String!
    rut: String
    fantasy_name: String!
    phone_number: String
    provider_type: ProviderType!
    quality: String!
    latitude: Float!
    longitude: Float!
    commune: Commune!
    status: Boolean!
}

extend type Query {
    allProvider: [Provider!]
}

extend type Mutation {
    addProvider(
        email: String
        provider_name: String!
        name: String!
        rut: String
        fantasy_name: String!
        phone_number: String
        provider_type: String!
        latitude: Float!
        longitude: Float!
        commune: String!
        quality: String!

    ): NewProvider!
}
`

// resolvers graphql

export const resolvers = {
  Query: {
    allProvider: async () => {
      return await Provider.findAll()
    }
  },
  Mutation: {
    addProvider: async (
      root,
      {
        email,
        provider_name,
        name,
        rut,
        fantasy_name,
        phone_number,
        provider_type,
        quality
      }
    ) => {
      return await Provider.create({
        email,
        provider_name,
        name,
        rut,
        fantasy_name,
        phone_number,
        provider_type,
        quality
      })
    }
  },
  Provider: {
    provider_type: async ({ provider_type }) => {
      return await ProviderType.findOne({
        where: { name: provider_type }
      })
    },
    commune: async ({ commune }) => {
      return await Commune.findOne({
        where: { name: commune }
      })
    }
  }
}
