import { User } from '../models/User.js'
import { Person } from '../models/Person.js'

// definitions graphql
export const typeDefs = `#graphql

  type User {
    id: Int!
    person: Person!
    password: String!
    role: String!
    status: Boolean!
  }

  extend type Query {
    allUsers: [User]
    usersCount: Int!
    findUser(email: String!): User
  }

 extend type Mutation {
   addUser(
       person: Int!
       password: String!
       role: String!
       status: Boolean!
   ): User
 }
`

// resolvers graphql
export const resolvers = {
  Query: {
    allUsers: async () => {
      return await User.findAll({order: [['id', 'ASC']],attributes: ['id', 'person', 'role','status']})
    },
    usersCount: async () => {
      return await User.count()
    },
    findUser: async (root, { email }) => {
      try {
        const {id} = await Person.findOne({where: {email}})
        const user = await User.findOne({ where: { id },attributes: ['id', 'person', 'role','status'] })
        if (!user) {
          throw new Error(`No user was found with the id: ${id}`)
        }
        return user
      } catch (err) {
        console.error(err)
        throw err
      }
    }
  },
  Mutation: {
    addUser: async (
      root,
      { person, password, role,status }
    ) => {

      const user = await User.findOne({ where: { person } })
      if (user) {
        throw new Error('User already exists')
      } else {
        const newUser = await User.create({
          person,
          password,
          role,
          status
        })
        return newUser
      }
    }
  },
  User: {
    person: async ({person}) =>{
      return await Person.findOne({ where: { id: person}})
    }
  }
}
