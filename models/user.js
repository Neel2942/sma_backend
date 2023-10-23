import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre("save",function(next){
    const user = this;

    bcrypt.hash(user.password,10,(err,hash)=>{
        user.password = hash;
        next();
    })
});

const userModel = mongoose.model("user",userSchema);
export default userModel;