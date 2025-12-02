import express from "express";
import { Post, Comment, User } from "../models/index.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// Get All Posts (Include User & Comments)
router.get("/", async (req, res) => {
  const posts = await Post.findAll({
    include: [
        { model: Comment },
        { model: User, attributes: ['username'] }
    ]
  });
  res.json(posts);
});

// Create Post
router.post("/", protect, async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
      user_id: req.user.user_id 
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;