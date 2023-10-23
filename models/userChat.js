import mongoose from "mongoose";
import userModel from "./user";

const userChatSchema = new mongoose.Schema({
    sourceId : userModel,
    targetId : userModel,
    message : String,
    createdAt : Date,
    updatedAt : Date,
});

const userChatModel = mongoose.model("userChat",userChatSchema);
export default userChatModel;