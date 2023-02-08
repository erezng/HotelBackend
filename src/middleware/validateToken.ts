import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../db/config/auth.config.js";

const validateToken: RequestHandler = (req, res, next) => {
  const token = req.body.authorization;
  if (!token) {
    return res.status(403).json({ message: "no token provided" });
  }
  jwt.verify(token, authConfig.secret, (err, payload: { id: string }) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const id = payload.id;
    req.userId = id;
    next();
  });
};
export { validateToken };
