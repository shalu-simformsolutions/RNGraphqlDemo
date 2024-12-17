import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
  HttpLink,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { AppContainer } from './navigation';
import { setContext } from '@apollo/client/link/context';
import { AuthProvider } from './context';
import { AppConst } from './constants';

// HTTP Link for Queries and Mutations
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

// WebSocket Link for Subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
    on: {
      connected: () => console.log('WebSocket connected'),
      closed: () => console.log('WebSocket disconnected'),
      error: err => console.error('WebSocket error', err),
    },
  }),
);

// Authentication Link for adding token to headers
const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(AppConst.authToken);
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Split Link to direct operations to appropriate link (http or websocket)
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

// Apollo Client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const App = () => (
  <AuthProvider>
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  </AuthProvider>
);

export default App;
