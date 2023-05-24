import { ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    uri: "https://kgicpxvzm5.execute-api.us-east-1.amazonaws.com/dev" + '/graphql',
    //uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  });

export default client