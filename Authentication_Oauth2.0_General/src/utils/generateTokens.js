import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateAccessToken = async (user, maxAge) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact
    },
    process.env.JWT_SECRET,
    {
      expiresIn: maxAge,
    }
  );
};
