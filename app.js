import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import userModel from "./models/user.js";
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
const typeDefs = `#graphql

  scalar Date

  type user {
    firstName: String
    lastName: String
    contactNumber: String
    emailAddress: String
    password: String
    registeredAt: Date
    lastLogin: Date
    introduction: String
    profile: String
  }

  type userFriend{
    sourceId: user
    targetId: user
    type: String
    status: String
    createdAt: Date
    updatedAt: Date
    notes: String
  }

  type userFollower{
    sourceId: user
    targetId: user
    type: String
    createdAt: Date
    updatedAt: Date
  }

  type userPost{
    sourceId: user
    targetId: user
    type: String
    createdAt: Date
    updatedAt: Date
  }

  type userChat{
    sourceId: user
    targetId: user
    type: String
    createdAt: Date
    updatedAt: Date
  }

  type Query{
    getAllUser: [user]
  }

  input userData{
    firstName: String
    lastName: String
    contactNumber: String
    emailAddress: String
    password: String
    introduction: String
    profile: String
  }

  type Mutation{
    insertUser(userDetails:userData): user
  }
`;

// Resolvers Function
const resolvers = {
  Query: {},
  Mutation: {
    insertUser: async (parent, args, context, info) => {
      const user = args.userDetails;
      const userInsertDb = new userModel({
        ...args.userDetails,
      });
      const data = await userModel.findOne({
        emailAddress: user["emailAddress"],
      });
      if (data) {
        console.log("Only one account can be made using email address");
      } else {
        const userSaved = await userInsertDb.save();
        console.log(user);
        return user;
      }
    }
  }
};

// Apollo Server Instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
