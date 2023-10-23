import mongoose from "mongoose";
import userModel from "./user";

const userFriendSchema = new mongoose.Schema({
    sourceId : userModel,
    targetId : userModel,
    type : String,
    status : String,
    createdAt : Date,
    updatedAt : Date,
    notes : String
});

const userFriendModel = mongoose.model("userFriend",userFriendSchema);
export default userFriendModel;