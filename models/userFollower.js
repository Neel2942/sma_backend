import mongoose from "mongoose";
import userModel from "./user";

const userFollowerSchema = new mongoose.Schema({
    sourceId : userModel,
    targetId : userModel,
    type : String,
    createdAt : Date,
    updatedAt : Date,
});

const userFollowerModel = mongoose.model("userFollower",userFollowerSchema);
export default userFollowerModel;