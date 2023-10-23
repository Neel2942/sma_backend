import mongoose from "mongoose";

const userPostSchema = new mongoose.Schema({

});

const userPostModel = mongoose.model("userPost",userPostSchema);
export default userPostModel;