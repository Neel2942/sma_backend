import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    firstName : {type:String,required:true},
    lastName : {type:String,required:true},
    contactNumber : {type:String,required:true},
    emailAddress : {type:String,required:true},
    password : {type:String,required:true},
    registeredAt : {type:Date,required:true},
    lastLogin : {type:Date,required:true,default: new Date()},
    introduction : {type:String,required:true},
    profile : {type:String,required:true}

});

const userModel = mongoose.model("user",userSchema);
export default userModel;