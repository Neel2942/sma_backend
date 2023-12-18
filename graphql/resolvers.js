// Graphql Upload Scalar
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

import loginUserByEmail from "./resolvers/loginUserByEmail.js";

import insertUser from "./resolvers/insertUser.js";

import insertUserFriend from "./resolvers/insertUserFriend.js";

import insertUserPost from "./resolvers/insertPost.js";


const resolvers = {
  Upload:GraphQLUpload,
    Query: {
      
    },
    Mutation: {
      insertUser,
      loginUserByEmail,
      insertUserFriend,
      insertUserPost
    },
  };

  export default resolvers