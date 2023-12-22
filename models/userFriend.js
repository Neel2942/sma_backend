import mongoose from "mongoose";

const userFriendSchema = new mongoose.Schema({
    sourceId : {type:mongoose.Schema.Types.ObjectId,ref:"userModel",default: new Date()},
    targetId : {type:mongoose.Schema.Types.ObjectId,ref:"userModel",default: new Date()},
    type : {type:String},
    status : {type:String},
    createdAt : {type:Date,default:new Date()},
    updatedAt : {type:Date,default:new Date()},
    notes : {type:String}
});

const userFriendModel = mongoose.model("userFriend",userFriendSchema);
export default userFriendModel;