// src/hooks/useGraphQLQuery.js
import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "./client";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const useGraphQLQuery = (key, query, variables, options = {}) => {
  const result = useQuery(
    [key, variables],
    async () => {
      try {
        return await graphqlClient.request(query, variables);
      } catch (err) {
        // Normalize and rethrow for react-query
        const gqlError =
          err?.response?.errors?.[0]?.message ||
          err?.message ||
          "Unknown GraphQL Error";
        throw new Error(gqlError);
      }
    },
    {
      ...options,
    }
  );

  // 🔥 Show toast on error
  useEffect(() => {
    if (result.error) {
      toast.error(result.error.message);
    }
  }, [result.error]);

  return {
    data: result.data,
    error: result.error,
    isLoading: result.isLoading,
    refetch: result.refetch,
  };
};
