import { Router } from "express";

const router = Router();

// POST /api/resume/upload
router.post("/upload", (req, res) => {
  res.status(200).json({ message: "Resume upload route - coming soon" });
});

// GET /api/resume/:id
router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Get resume ${req.params.id} - coming soon` });
});

export default router;
