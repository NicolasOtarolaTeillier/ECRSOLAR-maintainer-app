import { Role } from '../models/Role.js'

// definitions graphql
export const typeDefs = `#graphql

  type Role {
    id: Int!
    role: String!
  }

  extend type Query {
    allRoles: [Role]
    rolesCount: Int!
    findRole(role: String!): Role
  }

  extend type Mutation {
   addRole(
       role: String!
   ): Role
 }
`

// resolvers graphql
export const resolvers = {
  Query: {
    allRoles: async () => {
      return await Role.findAll({order: [['role', 'ASC']]})
    },
    rolesCount: async () => {
      return await Role.count()
    },
    findRole: async (root, { role }) => {
      try {
        const r = await Role.findOne({ where: { role } })
        if (!r) {
          throw new Error(`No Role was found with the name: ${role}`)
        }
        return r
      } catch (err) {
        console.error(err)
        throw err
      }
    }
  },
  Mutation: {
    addRole: async (
      root,
      { role }
    ) => {
      const r = await Role.findOne({ where: { role } })
      if (r) {
        throw new Error('Role already exists')
      } else {
        return await Role.create({role})
      }
    }
  }
}
