import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://resolu.onrender.com/graphql", 
  }),
  cache: new InMemoryCache(),
});
