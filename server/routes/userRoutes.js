import express from 'express';
import { getUserById, getUserResumes, loginUser, registerUser } from '../controllers/UserController.js';
import protect from '../Middleware/authMiddleware.js';




const userRoutes = express.Router();

userRoutes.post('/register',registerUser);
userRoutes.post('/login',loginUser);
userRoutes.get('/data',protect,getUserById);
userRoutes.get('/resumes',protect,getUserResumes);

export default userRoutes;
