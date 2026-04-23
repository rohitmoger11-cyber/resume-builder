import express from 'express';
import protect from '../Middleware/authMiddleware.js';
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from '../controllers/resumeController.js';
import upload from '../configs/multer.js';





const resumeRoutes = express.Router();

resumeRoutes.post('/create',protect,createResume);
resumeRoutes.put('/update/:resumeId',upload.single('image'),protect,updateResume);
resumeRoutes.delete('/delete/:resumeId',protect,deleteResume);
resumeRoutes.get('/get/:resumeId',protect,getResumeById);
resumeRoutes.get('/public/:resumeId',getPublicResumeById);

export default resumeRoutes;