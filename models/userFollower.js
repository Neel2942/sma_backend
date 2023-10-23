import mongoose from "mongoose";

const userFollowerSchema = new mongoose.Schema({
    sourceId : {type:mongoose.Schema.Types.ObjectId,ref:"userModel",default: new Date()},
    targetId : {type:mongoose.Schema.Types.ObjectId,ref:"userModel",default: new Date()},
    type : String,
    createdAt : Date,
    updatedAt : Date,
});

const userFollowerModel = mongoose.model("userFollower",userFollowerSchema);
export default userFollowerModel;