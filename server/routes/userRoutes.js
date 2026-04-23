import express from 'express';
import { getUserById, loginUser, registerUser } from '../controllers/UserController';
import protect from '../Middleware/authMiddleware';




const userRoutes = express.Router();

userRoutes.post('/register',registerUser);
userRoutes.post('/login',loginUser);
userRoutes.get('/data',protect,getUserById);

export default userRoutes;
