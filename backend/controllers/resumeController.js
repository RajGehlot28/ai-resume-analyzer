import { analyzeWithAI } from "../services/aiService.js";
import Analysis from "../models/Analysis.js";

export const analyzeResume = async (req, res) => {
  try {
    const analysis = await analyzeWithAI(req.file.buffer, req.body.jobDescription);
    const parsed = JSON.parse(analysis);
    await Analysis.create({ 
        userId: req.userId,
        resumeName: req.file.originalname,
        result: parsed 
    });
    res.json({ success: true, data: parsed });
  } catch(err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getHistory = async (req, res) => {
  const history = await Analysis.find({ userId: req.userId }).sort("-createdAt");
  res.json({ success: true, data: history });
};