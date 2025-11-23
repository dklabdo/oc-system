// src/hooks/useGraphQLMutation.js
import { useMutation } from '@tanstack/react-query';
import { graphqlClient } from './client';

export const useGraphQLMutation = (mutation, options) => {
  return useMutation(async (variables) => {
    return graphqlClient.request(mutation, variables);
  }, options);
};
