import express from "express";
import { analyzeResume, getHistory } from "../controllers/resumeController.js";
import { upload } from "../middleware/upload.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.post("/analyze", protect, upload.single("resume"), analyzeResume);
router.get("/history", protect, getHistory);

export default router;