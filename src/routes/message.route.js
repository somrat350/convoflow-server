import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
  getChatPartners,
} from "../controllers/message.controller.js";

const router = express.Router();
router.use(isAuthenticated);

// Routes for message
router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/chat/:userId", getMessagesByUserId);
router.post("/send/:userId", sendMessage);

export default router;
