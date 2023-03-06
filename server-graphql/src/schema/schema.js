//import {typeDefs as User, resolvers as UserResolvers} from './user.js'
import {typeDefs as Report, resolvers as ReportResolvers} from './report.js'



const rootTypeDefs = `#graphql
    type Query {
        _: String,
        hello: String
    }

    type Mutation {
        _: String
    }
`

const rooResolvers = {
    Query: {
        hello: () => 'world',
      },
}




export const resolvers = [rooResolvers,ReportResolvers]

export const typeDefs = [rootTypeDefs,Report]