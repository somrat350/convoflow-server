import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    secure: ENV.NODE_ENV === "production",
  });

  return token;
};
