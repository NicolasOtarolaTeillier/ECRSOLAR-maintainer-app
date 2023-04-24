import { Commune } from '../models/Commune.js'
import { Region } from '../models/Region.js'

// definitions graphql
export const typeDefs = `#graphql

type NewCommune {
    name: String!
    region: String!
}

type Commune {
    name: String!
    region: String!
}

extend type Query {
    allCommunes: [Commune!]
}

extend type Mutation {
    addCommune(
        name: String!
        region: String!
    ): NewCommune!
}
`

// resolvers graphql

export const resolvers = {
  Query: {
    allCommunes: async () => {
      return await Commune.findAll({
        order: [['name', 'ASC']]
      })
    }
  },
  Mutation: {
    addCommune: async (root, { name, region }) => {
      const reg = await Region.findOne({ name: region })
      if (!reg) {
        throw new Error(`Región no exists.`)
      }
      return await Commune.create({
        name,
        region
      })
    }
  },
//   Commune: {
//     region: async ({ region }) => {
//       return await Region.findOne({
//         where: { name: region }
//       })
//     }
//   }
}
