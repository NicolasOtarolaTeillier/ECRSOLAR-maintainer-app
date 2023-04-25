
import { Customer } from '../models/Customer.js'
import { FunctionalArea } from '../models/FunctionalArea.js'
import { Contact } from '../models/Contact.js'

export const typeDefs = `#graphql

    type NewContact {
        id: Int!
        customer: String!
        first_name: String!
        last_name: String!
        phone_number: String
        email: String
        functional_area: String!
        position: String
        status: Boolean!
    }

    type Contact {
        id: Int!
        customer: Customer!
        first_name: String!
        last_name: String!
        email: String
        phone_number: String
        functional_area: FunctionalArea!
        position: String
        status: Boolean!
    }

    extend type Query {
    allContacts: [Contact!]
  }

  extend type Mutation {
    addContact(
        customer: String!
        first_name: String!
        last_name: String!
        email: String
        phone_number: String
        position: String
        functional_area: String!
    ): NewContact!
 }
`

// resolvers graphql
export const resolvers = {
  Query: {
    allContacts: async () => {
      return await Contact.findAll({ order: [['id', 'ASC']] })
    }
  },
  Mutation: {
    addContact: async (
      root,
      { customer, first_name, last_name, email, phone_number, functional_area }
    ) => {
      const duplicateContact = await Contact.findOne({
        where: { customer, first_name, last_name, email, position, functional_area }
      })
      if (duplicateContact) {
        throw new Error(
          `Contact already exists, with id: ${duplicateContact.id}`
        )
      } else {
        return await Contact.create({
          customer,
          first_name,
          last_name,  
          email,
          phone_number,
          position,
          functional_area
        })
      }
    }
  },
  Contact: {
    customer: async ({ customer }) => {
      return await Customer.findOne({ where: { name: customer } })
    },
    functional_area: async ({ functional_area }) => {
      return await FunctionalArea.findOne({ where: { name: functional_area } })
    }
  }
}
