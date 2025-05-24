import jwt from "jsonwebtoken";

export const CreateToken = (user, maxAge) => {
return jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: maxAge }
    )
};
