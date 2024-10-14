import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import typeDefs from "./src/graphql/schema.js";
import resolvers from "./src/graphql/resolver.js";
import { initDatabase } from "./src/db/init.js";
// import user from "./src/user/resolver";
// const resolvers = mergeResolvers([product, user]);

dotenv.config();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});
initDatabase();
server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log("Server is running on localhost:4000", url));
