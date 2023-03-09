import { typeDefs as Person, resolvers as PersonResolvers } from './person.js'
import { typeDefs as Role, resolvers as RoleResolvers } from './role.js'
import { typeDefs as User, resolvers as UserResolvers } from './user.js'

const rootTypeDefs = `#graphql
    type Query {
        _: String,
        hello: String
    }

    type Mutation {
        _: String
    }
`

const rooResolvers = {
  Query: {
    hello: () => 'Hello world!, Welcome to app ecrsolar'
  }
}

export const resolvers = [
  rooResolvers,
  PersonResolvers,
  RoleResolvers,
  UserResolvers,
]

export const typeDefs = [
    rootTypeDefs, 
    Person,
    Role,
    User,
]
