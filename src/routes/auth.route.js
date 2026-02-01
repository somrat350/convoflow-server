import express from "express";
const router = express.Router();

// Example route for user login
router.post("/login", (req, res) => {
  // Handle user login logic here
  res.send("User login");
});

export default router;
