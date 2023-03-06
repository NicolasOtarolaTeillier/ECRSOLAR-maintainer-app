import {
  startServerAndCreateLambdaHandler,
  handlers
} from '@as-integrations/aws-lambda'
import { ApolloServer } from '@apollo/server'
import { typeDefs, resolvers } from './src/schema/schema.js'
import { sequelize } from './src/database/database.js'

import './src/models/User.js'
//import './src/models/User.js'
//import './src/models/Role.js'
//import './src/models/Report.js'
//import './src/models/asocciations.js'

// ORM
 async function orm () {
   try {
     await sequelize.sync()
     console.log('(sequelize) Connection has been established successfully.')
   } catch (error) {
     console.error('(sequelize) Unable to connect to the database:', error)
   }
 }

// server init apollo server
// create new server
const server = new ApolloServer({
  typeDefs,
  resolvers
})
export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  // We will be using the Proxy V2 handler
  handlers.createAPIGatewayProxyEventV2RequestHandler()
)

//orm()
