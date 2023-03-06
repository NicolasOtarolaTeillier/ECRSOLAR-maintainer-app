import { GraphQLError } from 'graphql'
import {knex} from '../knex/knex.js'

// definitions graphql
export const typeDefs = `#graphql

  type User {
    id: Int!              # (ejemplo: 1)
    email: String!        # (ejemplo: asd@asd)
    password: String!     # (ejemplo: asd123)
    name: String!         # (ejemplo: Nicolás)
    role: String!         # (estados: admin, operator, supervisor, client)
    status: Boolean!      # (estados: true,false)
    last_name: String     # (ejemplo: Otárola)
    rut:  String!         # (ejemplo: 18470642-3)
    country: String       # (ejemplo: Chile)
    
  }

  extend type Query {
    allUsers: [User]
    usersCount: Int!
    findUser(email: String!): User
  }

  extend type Mutation {
    addUser(
        name: String!
        last_name: String
        email: String!
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
      return knex('users')
        .select()
        .then(users => {
          return users
        })
    },
    usersCount: () => data_users.length,
    findUser: (root, args) => {
      const { email } = args
      return data_users.find(user => user.email === email)
    }
  },
  Mutation: {
    addUser: (root, args) => {
      if (data_users.find(u => u.email === args.email)) {
        throw new GraphQLError('Invalid argument value', {
          extensions: {
            code: 'BAD_USER_INPUT',
            exceptions: {
              invalidArg: args.email
            }
          }
        })
      }
      const user = { ...args }
      data_users.push(user)
      return user
    }
  }
}