import mongoose from "mongoose";

const userFriendSchema = new mongoose.Schema({
    sourceId : {type:mongoose.Schema.Types.ObjectId,ref:"userModel",default: new Date()},
    targetId : {type:mongoose.Schema.Types.ObjectId,ref:"userModel",default: new Date()},
    type : String,
    status : String,
    createdAt : {type:Date,default:new Date()},
    updatedAt : {type:Date,default:new Date()},
    notes : String
});

const userFriendModel = mongoose.model("userFriend",userFriendSchema);
export default userFriendModel;