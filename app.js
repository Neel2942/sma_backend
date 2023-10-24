import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

// MongoDB Connection
const uri =
  "mongodb+srv://admin:1234@cluster0.hpmh8cf.mongodb.net/SMA?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

// Graphql Type Definations
import typeDefs from "./graphql/typeDefs.js"

// Resolvers Function
import resolvers from "./graphql/resolvers.js";

// Apollo Server Instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
