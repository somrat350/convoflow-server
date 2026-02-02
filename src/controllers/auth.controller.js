import { sendWelcomeEmail } from "../emails/emailHandler.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists." });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
      res.status(201).json({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
      });

      try {
        await sendWelcomeEmail(savedUser.email, savedUser.name, ENV.CLIENT_URL);
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }
    } else {
      return res.status(400).json({ message: "Invalid user data!" });
    }
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required." });
    
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid email or password" });

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in user login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (_, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};
