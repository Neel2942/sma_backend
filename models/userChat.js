import mongoose from "mongoose";

const userChatSchema = new mongoose.Schema({
    sourceId : {type:mongoose.Schema.Types.ObjectId,ref:"userModel",default: new Date()},
    targetId : {type:mongoose.Schema.Types.ObjectId,ref:"userModel",default: new Date()},
    message : String,
    createdAt : Date,
    updatedAt : Date,
});

const userChatModel = mongoose.model("userChat",userChatSchema);
export default userChatModel;