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

router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // memastikan hanya pemilik yang bisa hapus
    if (post.user_id !== req.user.user_id) {
      return res.status(403).json({ message: "Not allowed: Not your post" });
    }

    await post.destroy();
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const postId = parseInt(req.params.postId, 10);
    if (isNaN(postId)) {
      return res.status(400).json({ message: "Invalid Post ID format" });
    }

    const post = await Post.findByPk(postId, {
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
        {
          model: User,
          attributes: ["username"], // user pembuat post
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to get post" });
  }
});


// 🔥 POST comment to a post
router.post("posts/:postId/comments", protect, async (req, res) => {
  try {
    // Pastikan postId adalah angka
    const postId = parseInt(req.params.postId, 10);
    if (isNaN(postId)) {
      return res.status(400).json({ message: "Invalid Post ID format" });
    }

    // Cari post terlebih dahulu
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Buat komentar baru
    const comment = await Comment.create({
      content: req.body.content,
      post_id: post.post_id,   // sesuai field di DB
      user_id: req.user.user_id,
    });

    res.status(201).json(comment);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;