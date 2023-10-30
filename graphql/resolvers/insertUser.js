import jwt from "jsonwebtoken";
import userModel from "../../models/user.js";

const insertUser = async (parent, args, context, info) => {
  const user = args.userDetails;
  const email = user["emailAddress"];
  const userInsertDb = new userModel({
    ...args.userDetails,
  });
  const data = await userModel.findOne({
    emailAddress: user["emailAddress"],
  });
  if (data) {
    console.log("Only one account can be made using email address");
  } else {
    const token = jwt.sign(
      { userId: userInsertDb._id, email },
      "UNSAFE_STRING",
      {
        expiresIn: "2h",
      }
    );
    userInsertDb.token = token;
    const userSaved = await userInsertDb.save();
    console.log(user);
    return user;
  }
};

export default insertUser;
