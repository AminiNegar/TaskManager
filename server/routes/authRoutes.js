import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {SignUp , Login } from '../controllers/authController.js'
import { getAllTasks , createTask , updateTasks } from '../controllers/taskController.js';
import { protect} from '../middleware/auth.js';


const router = express.Router()
router.get('/all', protect, getAllTasks); 
router.post('/add', protect, createTask);
router.patch('/update/:id', protect, updateTasks);
router.post('/signup',SignUp)
router.post('/login',Login)
router.get('/all', protect, getAllTasks);
router.post('/add', protect, createTask);


export default router;