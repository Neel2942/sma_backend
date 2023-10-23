import mongoose from "mongoose";
import userModel from "./user";

const userPostSchema = new mongoose.Schema({
    sourceId : userModel,
    targetId : userModel,
    message : String,
    createdAt : Date,
    updatedAt : Date,
});

const userPostModel = mongoose.model("userPost",userPostSchema);
export default userPostModel;