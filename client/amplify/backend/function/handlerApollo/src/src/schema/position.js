import { Position } from '../models/Position.js'

// definitions graphql
export const typeDefs = `#graphql

  type Position {
    id: Int!
    name: String!
    status: Boolean!
  }

  extend type Query {
    allPositions: [Position]
  }

  extend type Mutation {
   addPosition(
       name: String!
   ): Position
 }
`

// resolvers graphql
export const resolvers = {
  Query: {
    allPositions: async () => {
      return await Position.findAll({order: [['id', 'ASC']]})
    },
  },
  Mutation: {
    addPosition: async (
      root,
      { name }
    ) => {
      const r = await Position.findOne({ where: { name } })
      if (r) {
        throw new Error('Position already exists')
      } else {
        return await Position.create({name})
      }
    }
  }
}
