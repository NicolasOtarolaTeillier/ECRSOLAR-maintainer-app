import { Person } from '../models/Person.js'

// definitions graphql
export const typeDefs = `#graphql

  type Person {
    id: Int!
    email: String!
    first_name: String!
    last_name: String!
    phone_number: String
    rut: String
    status: Boolean!
  }

  extend type Query {
    allPersons: [Person]
    personsCount: Int!
    findPerson(email: String!): Person
  }

 extend type Mutation {
   addPerson(
     email: String!
     first_name: String!
     last_name: String!
     phone_number: String
     rut: String
   ): Person
 }
`

// // resolvers graphql
 export const resolvers = {
   Query: {
     allPersons: async () => {
       return await Person.findAll({
         order: [['id', 'ASC']],
         //attributes: ['id', 'email', 'first_name', 'last_name', 'phone_number', 'status']
       })
     },
     personsCount: async () => {
       return await Person.count()
     },
     findPerson: async (root, { email }) => {
       try {
         const person = await Person.findOne({
           where: { email },
           //attributes: ['id', 'email', 'firstName', 'lastName', 'role', 'status']
         })
         if (!person) {
           throw new Error(`No Person was found with the email: ${email}`)
         }
         return person
       } catch (err) {
         console.error(err)
         throw err
       }
     }
   },
   Mutation: {
     addPerson: async (
       root,
       { email, first_name, last_name, phone_number, rut, status }
     ) => {
       const person = await Person.findOne({ where: { email } })
       if (person) {
         throw new Error(`Person with email ${email}, already exists`)
       } else {
         const newPerson = await Person.create({
           email,
           first_name,
           last_name,
           phone_number,
           rut,
           status
         })
         return newPerson
       }
     }
   }
 }
