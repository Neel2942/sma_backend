import insertUser from "./resolvers/insertUser.js";
import loginUserByEmail from "./resolvers/loginUserByEmail.js";
import insertUserFriend from "./resolvers/insertUserFriend.js";

const resolvers = {
    Query: {
      
    },
    Mutation: {
      insertUser,
      loginUserByEmail,
      insertUserFriend
    },
  };

  export default resolvers