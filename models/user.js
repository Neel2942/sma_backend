import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    firstName : {type:String},
    lastName : {type:String},
    contactNumber : {type:String},
    emailAddress : {type:String},
    password : {type:String},
    registeredAt : {type:Date,default: new Date()},
    lastLogin : {type:Date,default: new Date()},
    introduction : {type:String},
    profile : {type:String}

});

const userModel = mongoose.model("user",userSchema);
export default userModel;