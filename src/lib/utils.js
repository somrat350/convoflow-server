import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("token", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "none",
    secure: true,
  });

  return token;
};
