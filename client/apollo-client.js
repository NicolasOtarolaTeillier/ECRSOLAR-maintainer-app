import { ApolloClient, InMemoryCache} from '@apollo/client';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);


const client = new ApolloClient({
    uri: 'https://kgicpxvzm5.execute-api.us-east-1.amazonaws.com/dev' + '/graphql',
    cache: new InMemoryCache(),
  });

export default client