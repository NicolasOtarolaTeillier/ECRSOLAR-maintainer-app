import { Report } from '../models/Report.js'
import { GraphQLScalarType, Kind } from 'graphql'

// data type JSON
const JSONObject = new GraphQLScalarType({
  name: 'JSON',
  description: 'A JSON object scalar type',
  parseValue (value) {
    return JSON.parse(value)
  },
  serialize (value) {
    return JSON.stringify(value)
  },
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return JSON.parse(ast.value)
    }
    return null
  }
})

// definitions graphql
export const typeDefs = `#graphql
  scalar JSON

  type Report {
    id: Int!
    name: String!
    date: String! 
    data_day: JSON! 
    data_month: JSON!
  }

  extend type Query {
    allReports: [Report!]
    findReport(id: Int!): Report!
    findReports(name: String!): [Report!]
  }

  extend type Mutation {
    addReport(
    name: String!
    date: String! 
    data_day: JSON! 
    data_month: JSON!
    ): Report!

    updateReport(
      id: Int!
      name: String!
      date: String! 
      data_day: JSON! 
      data_month: JSON!
    ): Report!
  }
`

// resolvers graphql
export const resolvers = {
  JSON: JSONObject,
  Query: {
    allReports: async () => {
      try {
        return await Report.findAll({
          order: [['id', 'ASC']]
        })
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    findReport: async (root, args) => {
      try {
        const { id } = args
        return await Report.findByPk(id)
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    findReports: async (root, args) => {
      try {
        const { name } = args
        return await Report.findAll({ where: { name } })
      } catch (err) {
        console.error(err)
        throw new Error(err)
      }
    }
  },
  Mutation: {
    addReport: async (root, args) => {
      try {
        return await Report.create(args)
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    updateReport: async (root, { id, ...data }) => {
      try {
        await Report.update(data, { where: { id } })
        return await Report.findByPk(id)
      } catch (err) {
        console.error(err)
        throw err
      }
    }
  }
}
