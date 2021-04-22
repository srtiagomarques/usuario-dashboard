import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { ApolloProvider } from 'react-apollo';
import apolloClient from '../lib/services/graphql/apolloClient';

import App from '../lib/core/App';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);