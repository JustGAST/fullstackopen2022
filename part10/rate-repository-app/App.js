import {NativeRouter} from 'react-router-native';
import {StatusBar} from 'expo-status-bar';
import {ApolloProvider} from '@apollo/client';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();

export default function App() {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main/>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto"/>
    </>
  );
}