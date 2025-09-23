// server/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // token extract
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // user find karke request me daalna (password exclude karke)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (err) {
      console.error("JWT Error:", err.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
