import express from "express";
import { Weapon } from "../models/index.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  const list = await Weapon.findAll();
  return res.json(list);
});

// GET by id
router.get("/:id", async (req, res) => {
  const w = await Weapon.findByPk(req.params.id);
  if (!w) return res.status(404).json({ message: "Not found" });
  return res.json(w);
});

// CREATE (protected)
router.post("/", protect, async (req, res) => {
  const item = await Weapon.create(req.body);
  return res.status(201).json(item);
});

// UPDATE (protected)
router.put("/:id", protect, async (req, res) => {
  const w = await Weapon.findByPk(req.params.id);
  if (!w) return res.status(404).json({ message: "Not found" });
  await w.update(req.body);
  return res.json(w);
});

// DELETE (protected)
router.delete("/:id", protect, async (req, res) => {
  await Weapon.destroy({ where: { id: req.params.id } });
  return res.json({ message: "Deleted" });
});

export default router;
