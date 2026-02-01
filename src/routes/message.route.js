import express from "express";
const router = express.Router();

// Example route for message
router.post("/send", (req, res) => {
  // Handle message logic here
  res.send("Message sent");
});

export default router;
