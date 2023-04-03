import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import Constants from 'expo-constants';

const httpLink = createHttpLink({
  uri: Constants.manifest.extra.apolloUrl
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  })
}

export default createApolloClient;