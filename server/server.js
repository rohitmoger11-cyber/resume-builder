import express from 'express';
import cors from 'cors';
import "dotenv/config";
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './configs/db.js';
import userRoutes from './routes/userRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

app.use(express.json());
app.use(cors());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => res.send('Server is live'))
app.use('/api/users',userRoutes);
app.use('/api/resumes',resumeRoutes);
app.use('/api/ai',aiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});