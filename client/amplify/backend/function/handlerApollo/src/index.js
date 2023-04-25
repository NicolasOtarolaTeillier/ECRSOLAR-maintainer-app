
 /**
  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
  */
import { ApolloServer } from 'apollo-server-lambda';

  //import { ApolloServer } from '@apollo/server'
  import { typeDefs, resolvers } from './src/schema/schema.js'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
});

export const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
