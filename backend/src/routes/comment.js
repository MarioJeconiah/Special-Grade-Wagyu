import express from "express";
import { Comment } from "../models/index.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// update comment (owner only)
router.put("/:commentId", protect, async (req, res) => {
  const comment = await Comment.findByPk(req.params.commentId);
  if (!comment) return res.status(404).json({ message: "Not found" });
  if (comment.userId !== req.user.id) return res.status(403).json({ message: "Not allowed" });
  await comment.update({ content: req.body.content });
  return res.json(comment);
});

// delete comment (owner only)
router.delete("/:commentId", protect, async (req, res) => {
  const comment = await Comment.findByPk(req.params.commentId);
  if (!comment) return res.status(404).json({ message: "Not found" });
  if (comment.userId !== req.user.id) return res.status(403).json({ message: "Not allowed" });
  await comment.destroy();
  return res.json({ message: "Deleted" });
});

export default router;
