import { PurchaseOrder } from '../models/PurchaseOrder.js'

// definitions graphql
export const typeDefs = `#graphql

  type Client {
    id: Int!              # (ejemplo: 1)
    name: String!         # (ejemplo: )
    number: Int!          # (ejemplo: 20230303)
    date: String!         # (estados: 03-03-2023)
    client: String!       # (client: daniel@ienergiachile.com)
    central: String!      # (PFV Pucobre)
    status: Int!          # (estados: 0,1,2,3,4..)
  }

  extend type Query {
    allClients: [Client]
    clientsCount: Int!
    findClient(email: String!): Client
  }

   extend type Mutation {
     addClient(
         email: String!
         firstName: String!
         lastName: String!
         role: String!
         rut: String!
         phoneNumber: String!
         address: String!
         status: Boolean!
     ): Client
   }
`

// resolvers graphql
export const resolvers = {
  Query: {
    allClients: async () => {
      return await Client.findAll({ order: [['id', 'ASC']] })
    },
    clientsCount: async () => {
      return await Client.count()
    },
    findClient: async (root, {email}) => {
      try {
        const client = await Client.findByPk(email)
        if (!client) {
          throw new Error(`No client was found with the email: ${email}`)
        }
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  },
  Mutation: {
    addClient: async (
      root,
      { email, firstName, lastName, role, rut, phoneNumber, address, status }
    ) => {

      const client = await Client.findOne({ where: { email } })
      if (client) {
        throw new Error('Client already exists')
      }

      const Rut = await Client.findOne({ where: { rut } })
      if (Rut) {
        throw new Error('Rut already exists')
      }
      const newClient = await Client.create({
        email,
        firstName,
        lastName,
        role,
        rut,
        phoneNumber,
        address,
        status
      })
      return newClient
    }
  }
}
