import mongoose from "mongoose";

const userFollowerSchema = new mongoose.Schema({

});

const userFollowerModel = mongoose.model("userFollower",userFollowerSchema);
export default userFollowerModel;