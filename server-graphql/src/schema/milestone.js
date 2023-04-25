import { Milestone } from '../models/Milestone.js'
import { Staff } from '../models/Staff.js'

// definitions graphql
export const typeDefs = `#graphql

type Milestone {
    staff: Staff!
    name: String!
    date: String!
    status: Boolean
}


extend type Query {
    allMilestone: [Milestone!]
}

extend type Mutation {
    addMilestone(
        staff: Int!
        name: String!
        date: String!
    ): Milestone!
}
`

// resolvers graphql

export const resolvers = {
  Query: {
    allMilestone: async () => {
      return await Milestone.findAll()
    }
  },
  Mutation: {
    addMilestone: async (root, { staff, name, date }) => {
      const duplicate = await Milestone.findOne({
        where: { staff: staff, date: date }
      })
      console.log('duplicado', duplicate)
      // está duplicado?
      if (duplicate) {
        // retorna el nombre actualizado
        await Milestone.update(
          { name },
          { where: { staff: staff, date: date } }
        )
        return await Milestone.findOne({
          where: { staff: staff, date: date }
        })
      } else {
        // sino crea uno
        return await Milestone.create({ staff: staff, name: name, date: date })
      }
    }
  },
  Milestone: {
    staff: async ({ staff }) => {
      return await Staff.findOne({
        where: { id: staff }
      })
    }
  }
}
