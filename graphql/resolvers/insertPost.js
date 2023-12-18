import userModel from "../../models/user.js";
import userPostModel from "../../models/userPost.js";
import imageUpload from "./imageUpload.js"

const insertUserPost = async(parent,args,context,info) => {
    const userPost = args.userPostDetails;
    console.log(args.userPostDetails.post);
    const userCheck = await userModel.findById(userPost["sourceId"]);
    if(userCheck){
        const image = await imageUpload(null, { file: args.userPostDetails.post }, context, null);
        console.log(image);
        const insertUserPostDb = new userPostModel({
            ...userPost,
            post:image,
            createdAt: new Date()
        })
        if(insertUserPost){
            const userPostSaved = await insertUserPostDb.save();
            if(userPostSaved){
                console.log(insertUserPostDb);
                return userPost;
            }else{
                console.log("Error inserting data");
            }
        }else{
            console.log("Error saving data")
        }
    }else{
        console.log("User not found");
    }
}

export default insertUserPost;