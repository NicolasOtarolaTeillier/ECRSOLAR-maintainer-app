import { Customer } from '../models/Customer.js'

// definitions graphql
export const typeDefs = `#graphql

  type Customer {
    id: Int!
    name: String!
    fantasyName: String!
    status: Boolean!
  }
  extend type Query {
    allServices: [Service]
    servicesCount: Int!
    findService(name: String!): Service
  }

 extend type Mutation {
   addService(
       name: String!
   ): Service
 }
`