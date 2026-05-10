import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js'; 
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Main Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected! "))
  .catch(err => {
    console.log(" Database connection error:");
    console.error(err.message);
  });

app.listen(5000, () => console.log("Server running on port 5000 "));