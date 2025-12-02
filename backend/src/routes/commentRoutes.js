import express from "express";
import { Comment, Post } from "../models/index.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// --- FITUR AKTIF: CREATE COMMENT ---
router.post("/:postId", protect, async (req, res) => {
  try {
    // 💡 Perbaikan: Konversi postId (dari URL parameter) ke integer
    const postId = parseInt(req.params.postId, 10);
    if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid Post ID format" });
    }

    const post = await Post.findByPk(postId); // Gunakan postId yang sudah di-parse
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = await Comment.create({
      content: req.body.content,
      post_id: post.post_id,
      user_id: req.user.user_id
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



router.put("/:commentId", protect, async (req, res) => {
  try {
    // 💡 Perbaikan: Konversi commentId ke integer
    const commentId = parseInt(req.params.commentId, 10);
    if (isNaN(commentId)) {
        return res.status(400).json({ message: "Invalid Comment ID format" });
    }

    const comment = await Comment.findByPk(commentId); // Gunakan commentId yang sudah di-parse
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user_id !== req.user.user_id) {
      return res.status(403).json({ message: "Not allowed: Not your comment" });
    }

    await comment.update({ content: req.body.content });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:commentId", protect, async (req, res) => {
  try {
    // 💡 Perbaikan: Konversi commentId ke integer
    const commentId = parseInt(req.params.commentId, 10);
    if (isNaN(commentId)) {
        return res.status(400).json({ message: "Invalid Comment ID format" });
    }

    const comment = await Comment.findByPk(commentId); // Gunakan commentId yang sudah di-parse
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user_id !== req.user.user_id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await comment.destroy();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;