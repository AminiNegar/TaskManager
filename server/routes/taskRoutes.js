import express from 'express';
import { createTask, getAllTasks , updateTasks } from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';
import { deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.delete('/delete/:id', protect, deleteTask);
router.get('/all', protect, getAllTasks);
router.post('/add', protect, createTask); 
router.patch('/update/:id', updateTasks)

export default router;