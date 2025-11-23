// src/graphql/client.js
import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://studygo-qg1r.onrender.com/graphql';

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
});
