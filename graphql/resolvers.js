import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
import userFriendModel from "../models/userFriend.js";
import userFollowerModel from "../models/userFollower.js";
import userPostModel from "../models/userPost.js";
import userChatModel from "../models/userChat.js";

const resolvers = {
    Query: {
      
    },
    Mutation: {
      insertUser: async (parent, args, context, info) => {
        const user = args.userDetails;
        const email = user["emailAddress"];
        const userInsertDb = new userModel({
          ...args.userDetails,
        });
        const data = await userModel.findOne({
          emailAddress: user["emailAddress"],
        });
        if (data) {
          console.log("Only one account can be made using email address");
        } else {
          const token = jwt.sign(
            {userId: userInsertDb._id,email},"UNSAFE_STRING",
            {
              expiresIn:  "2h"
            });
            userInsertDb.token = token;        
          const userSaved = await userInsertDb.save();
          console.log(user);
          return user;
        }
      },
      loginUserByEmail: async(parent,args,context,info)=>{
        const email=args.userCred['emailAddress'];
        const password = args.userCred['password'];
        const data = await userModel.findOne({emailAddress:email});
        if(data){
          const passwordCheck = await bcrypt.compare(password,data['password']);
          if(passwordCheck){
            const token = jwt.sign(
              {userId: data._id,email},"UNSAFE_STRING",
              {
                expiresIn:  "2h"
              });
              data.token = token;
              console.log("Authentic User Login");
              return data;
          }else{
            console.log("Wrong Password");
          }
        }else{
          console.log("No Email Found");
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

  export default resolvers