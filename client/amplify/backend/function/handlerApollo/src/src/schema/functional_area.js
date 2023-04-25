import { FunctionalArea } from '../models/FunctionalArea.js'

// definitions graphql
export const typeDefs = `#graphql

  type FunctionalArea {
    id: Int!
    name: String!
    status: Boolean!
  }

  extend type Query {
    allFunctionalAreas: [FunctionalArea!]
  }

 extend type Mutation {
   addFunctionalArea(
     name: String!
   ): FunctionalArea
 }
`

// // resolvers graphql
 export const resolvers = {
   Query: {
     allFunctionalAreas: async () => {
       return await FunctionalArea.findAll({
         order: [['name', 'ASC']],
       })
     },
   },
   Mutation: {
     addFunctionalArea: async (
       root,
       { name }
     ) => {
       const funcional_area = await FunctionalArea.findOne({ where: { name } })
       if (funcional_area) {
         throw new Error(`Functiona area with name ${name}, already exists`)
       } else {
         const newFunctionalArea = await FunctionalArea.create({
           name
         })
         return newFunctionalArea
       }
     }
   }
 }
