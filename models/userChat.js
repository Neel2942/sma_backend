import mongoose from "mongoose";

const userChatSchema = new mongoose.Schema({

});

const userChatModel = mongoose.model("userChat",userChatSchema);
export default userChatModel;