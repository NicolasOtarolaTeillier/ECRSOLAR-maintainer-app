import {
    startServerAndCreateLambdaHandler,
    handlers
  } from '@as-integrations/aws-lambda'
  import { ApolloServer } from '@apollo/server'
  import { typeDefs, resolvers } from './src/schema/schema.js'
  
  // server init apollo server
  // create new server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
  })
  
  export const graphqlHandler = startServerAndCreateLambdaHandler(
    server,
    // We will be using the Proxy V2 handler
    handlers.createAPIGatewayProxyEventV2RequestHandler()
  )
