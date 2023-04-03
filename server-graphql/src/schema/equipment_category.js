import { EquipmentCategory } from '../models/EquipmentCategory.js'

// definitions graphql
export const typeDefs = `#graphql

type EquipmentCategory  {
    name: String!
    status: Boolean
}

extend type Query {
    allEquipmentCategories: [EquipmentCategory!]
}

extend type Mutation {
    addEquipmentCategory(
        name: String!
    ): EquipmentCategory!
}
`

// resolvers graphql

export const resolvers = {
  Query: {
    allEquipmentCategories: async () => {
      return await EquipmentCategory.findAll()
    }
  },
  Mutation: {
    addEquipmentCategory: async (root, { name }) => {
      return await EquipmentCategory.create({
        name,
      })
    }
  },
}
