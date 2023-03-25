import { Region } from '../models/Region.js'

// definitions graphql
export const typeDefs = `#graphql


type Region {
    name: String!
    number: Float!
}

extend type Query {
    allRegions: [Region!]
}

extend type Mutation {
    addRegion(
        name: String!
        number: Float!
    ): Region!
}
`

// resolvers graphql

export const resolvers = {
  Query: {
    allRegions: async () => {
      return await Region.findAll()
    }
  },
  Mutation: {
    addRegion: async (root, { name, number }) => {

      return await Region.create({
        name,
        number
      })
    }
  },
}
