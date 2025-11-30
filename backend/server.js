import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { sequelize } from "./src/models/index.js";

// Routes
import authRoutes from "./src/routes/auth.js";
import weaponRoutes from "./src/routes/weaponRoutes.js";
import characterRoutes from "./src/routes/characterRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import commentRoutes from "./src/routes/comment.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/weapons", weaponRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL");

    await sequelize.sync({ alter: true });
    console.log("📌 Database synced");
  } catch (err) {
    console.error("Database connection error:", err);
  }

  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
