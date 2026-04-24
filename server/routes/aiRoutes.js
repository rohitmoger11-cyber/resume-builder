import express from "express";
import protect from "../Middleware/authMiddleware.js";
import { enhanceJobDescription, enhanceResumeProSummary, uploadResume } from "../controllers/aiController.js";




const aiRoutes = express.Router();

aiRoutes.post('/enhance-pro-sum',protect,enhanceResumeProSummary)
aiRoutes.post('/enhance-job-desc',protect,enhanceJobDescription)
aiRoutes.post('/upload-resume',protect,uploadResume);

export default aiRoutes;