import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'
import { makeExecutableSchema } from '@graphql-tools/schema';
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

// Set up the Upload scalar in your schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an ApolloServer instance
const server = new ApolloServer({ schema });

// Create an Express application
const app = express();

// Start the ApolloServer
server.start().then(() => {
  // Apply middleware for file uploads
  app.use(graphqlUploadExpress());

  // Apply ApolloServer to Express application
  server.applyMiddleware({ app });

  // Start the Express application
  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
});
