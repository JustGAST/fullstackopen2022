import {NativeRouter} from 'react-router-native';
import {StatusBar} from 'expo-status-bar';
import Constants from 'expo-constants';
import {ApolloProvider} from '@apollo/client';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();

export default function App() {
  console.log(JSON.stringify(Constants.manifest.extra, null, 2));

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