import mongoose from "mongoose";

const userPostSchema = new mongoose.Schema({
    sourceId : {type:mongoose.Schema.Types.ObjectId,ref:"userModel",default: new Date()},
    targetId : {type:mongoose.Schema.Types.ObjectId,ref:"userModel",default: new Date()},
    message : String,
    createdAt : Date,
    updatedAt : Date,
});

const userPostModel = mongoose.model("userPost",userPostSchema);
export default userPostModel;