import mongoose from "mongoose";

const userFriendSchema = new mongoose.Schema({

});

const userFriendModel = mongoose.model("userFriend",userFriendSchema);
export default userFriendModel;