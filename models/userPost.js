import mongoose from "mongoose";

const userPostSchema = new mongoose.Schema({
    sourceId : {type:mongoose.Schema.Types.ObjectId,ref:"userModel",default: new Date()},
    post : {type: String},
    createdAt : {type: Date,default: new Date()},
    updatedAt : {type: Date,default: new Date()},
});

const userPostModel = mongoose.model("userPost",userPostSchema);
export default userPostModel;