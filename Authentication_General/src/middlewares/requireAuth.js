import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt || req.cookies.access_token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unautherized access",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err) {
        return res.status(403).json({
            success: false,
            message: ["Token Verification Failed", err.message]
        });
    }

    req.user = decoded;
    next();
  })
};
