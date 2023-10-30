import userFriendModel from "../../models/userFriend.js";

const insertUserFriend = async (parent, args, context, info) => {
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
    } else {
      console.log("No user2 found");
    }
  } else {
    console.log("No user1 found");
  }
};

export default insertUserFriend;
