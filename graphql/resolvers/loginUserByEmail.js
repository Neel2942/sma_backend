import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../models/user.js";

const loginUserByEmail = async (parent, args, context, info) => {
  const email = args.userCred["emailAddress"];
  const password = args.userCred["password"];
  const data = await userModel.findOne({ emailAddress: email });
  if (data) {
    const passwordCheck = await bcrypt.compare(password, data["password"]);
    if (passwordCheck) {
      const token = jwt.sign({ userId: data._id, email }, "UNSAFE_STRING", {
        expiresIn: "2h",
      });
      data.token = token;
      console.log("Authentic User Login");
      return data;
    } else {
      console.log("Wrong Password");
    }
  } else {
    console.log("No Email Found");
  }
};

export default loginUserByEmail;
