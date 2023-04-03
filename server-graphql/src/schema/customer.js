import { Customer } from '../models/Customer.js'

// definitions graphql
export const typeDefs = `#graphql

  type Customer {
    id: Int!
    name: String!
    fantasy_name: String!
    rut: String!
    # address: String!
    # url: String
    status: Boolean!
  }
  extend type Query {
    allCustomers: [Customer!]
    customersCount: Int!
    findCustomer(fantasy_name: String!): Customer
  }

 extend type Mutation {
   addCustomer(
    name: String!
    fantasy_name: String!
    rut: String!
    # address: String!
    # url: String
    status: Boolean
   ): Customer
 }
`


// resolvers graphql
export const resolvers = {
  Query: {
    allCustomers: async () => {
      return await Customer.findAll({ order: [['createdAt', 'ASC']] })
    },
    customersCount: async () => {
      return await Customer.count()
    },
    findCustomer: async (root, { fantasy_name }) => {
      try {
        const customer = await Customer.findOne(fantasy_name)
        if (!customer) {
          throw new Error(`No customer was found with the fantasy name: ${fantasy_name}`)
        }
        return customer
      } catch (err) {
        console.error(err)
        throw err
      } 
    }
  },
  Mutation: {
    addCustomer: async (
      root,
      {
        name,
        fantasy_name,
        rut,
        // address,
        // url,
        status
      }
    ) => {
      const duplicateCustomer = await Customer.findOne({ where: { rut} })
      if (duplicateCustomer) {
        throw new Error(`Customer already exists, with rut: ${duplicateCustomer.rut}`)
      }
      else{
        return await Customer.create({
          name,
          fantasy_name,
          rut,
          // address,
          // url,
          status
        })
      }
      
    }
  }
}
