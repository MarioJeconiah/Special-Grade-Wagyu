import express from "express";
import { Post, Comment } from "../models/index.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// list posts with comments
router.get("/", async (req, res) => {
  const posts = await Post.findAll({ include: [Comment] });
  return res.json(posts);
});

// single post
router.get("/:id", async (req, res) => {
  const post = await Post.findByPk(req.params.id, { include: [Comment] });
  if (!post) return res.status(404).json({ message: "Not found" });
  return res.json(post);
});

// create post
router.post("/", protect, async (req, res) => {
  const post = await Post.create({ ...req.body, userId: req.user.id });
  return res.status(201).json(post);
});

// update (owner only)
router.put("/:id", protect, async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });
  if (post.userId !== req.user.id) return res.status(403).json({ message: "Not allowed" });
  await post.update(req.body);
  return res.json(post);
});

// delete (owner only)
router.delete("/:id", protect, async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });
  if (post.userId !== req.user.id) return res.status(403).json({ message: "Not allowed" });
  await post.destroy();
  return res.json({ message: "Deleted" });
});

// comments: create for a post
router.post("/:id/comments", protect, async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const comment = await Comment.create({
    content: req.body.content,
    postId: post.id,
    userId: req.user.id
  });

  return res.status(201).json(comment);
});

export default router;
