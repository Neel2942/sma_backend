import mongoose from "mongoose";

const userChatSchema = new mongoose.Schema({
    sourceId : {type:mongoose.Schema.Types.ObjectId,ref:"userModel",default: new Date()},
    targetId : {type:mongoose.Schema.Types.ObjectId,ref:"userModel",default: new Date()},
    message : {type:String},
    createdAt : {Date,default:new Date()},
    updatedAt : {type:Date,default:new Date()},
});

const userChatModel = mongoose.model("userChat",userChatSchema);
export default userChatModel;