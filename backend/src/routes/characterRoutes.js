import express from "express";
import { Character } from "../models/index.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const list = await Character.findAll();
  return res.json(list);
});

router.get("/:id", async (req, res) => {
  const item = await Character.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  return res.json(item);
});

router.post("/", protect, async (req, res) => {
  const created = await Character.create(req.body);
  return res.status(201).json(created);
});

router.put("/:id", protect, async (req, res) => {
  const item = await Character.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  await item.update(req.body);
  return res.json(item);
});

router.delete("/:id", protect, async (req, res) => {
  await Character.destroy({ where: { id: req.params.id } });
  return res.json({ message: "Deleted" });
});

export default router;
