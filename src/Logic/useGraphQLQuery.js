// src/hooks/useGraphQLQuery.js
import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from './client';

export const useGraphQLQuery = (key, query, variables) => {
  return useQuery([key, variables], async () => {
    return graphqlClient.request(query, variables);
  });
};
