import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import bcrypt from "bcrypt";
import userModel from "./models/user.js";
import userFriendModel from "./models/userFriend.js";
// import userFollowerModel from "./models/userFollower.js";
// import userPostModel from "./models/userPost.js";
// import userChatModel from "./models/userChat.js";
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
    sourceId: ID
    targetId: ID
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
    getUserByEmail(userEmail:String,userPassword:String): user
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

  input userFriendData{
    sourceId: ID
    targetId: ID
    type: String
    status: String
    createdAt: Date
    updatedAt: Date
    notes: String
  }

  type Mutation{
    insertUser(userDetails:userData): user
    insertUserFriend(userFriendDetails:userFriendData): userFriend
  }
`;

// Resolvers Function
const resolvers = {
  Query: {
    getUserByEmail: async(parent,args,context,info)=>{
      const email=args.userEmail;
      const password = args.userPassword;
      const data = await userModel.findOne({emailAddress:email});
      if(data){
        const passwordCheck = await bcrypt.compare(password,data['password']);

        if(passwordCheck){
          console.log("Authentic User Login");
        }else{
          console.log("Wrong Password");
        }
      }else{
        console.log("No Email Found");
      }
    }
  },
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
    },
    insertUserFriend: async (parent, args, context, info) => {
      const userFriend = args.userFriendDetails;
      const userFriendInsertDb = new userFriendModel({
        ...args.userFriendDetails,
      });
      const data = await userModel.findById(userFriend["sourceId"]);
      if (data) {
        const data2 = await userModel.findById(userFriend["targetId"]);
        if (data2) {
          const userFriendSaved = await userFriendInsertDb.save();
          console.log(userFriend);
        }else{
          console.log("No user2 found");
        }
      } else {
        console.log("No user1 found");
      }
    },
  },
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
