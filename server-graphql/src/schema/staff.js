import { Staff } from '../models/Staff.js'
import { Position } from '../models/Position.js'
import { Person } from '../models/Person.js'

// definitions graphql
export const typeDefs = `#graphql

  type NewStaff {
    id: Int!
    person: Int!
    position: String!
    admission_date: String!
    dismissal_date: String
    status: Boolean!
  }

  type Staff {
    id: Int!
    person: Person!
    position: Position!
    admission_date: String!
    dismissal_date: String
    status: Boolean!
  }


  extend type Query {
    allStaffs: [Staff]
  }

  extend type Mutation {
   addStaff(
        person: Int!
        position: String!
        admission_date: String!
        dismissal_date: String
        status: Boolean
   ): NewStaff
 }
`
// resolvers graphql
export const resolvers = {
  Query: {
    allStaffs: async (root,args) => {
      return await Staff.findAll({
        order: [['id', 'ASC']],
        where: args
      })
    }
  },
  Mutation: {
    addStaff: async (
      root,
      { person, position, admission_date, dismissal_date, status }
    ) => {
      return await Staff.create({
        person,
        position,
        admission_date,
        dismissal_date,
        status
      })
    }
  },
  Staff: {
    person: async ({ person }) => {
      return await Person.findOne({ where: { id: person } })
    },
    position: async ({ position }) => {
      return await Position.findOne({ where: { name: position } })
    }
  }
}
