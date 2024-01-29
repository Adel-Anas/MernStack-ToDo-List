import express from 'express';
import TaskController from '../Controllers/TaskController';

const router = express.Router();

router.get('/tasks', TaskController.getAllTasks)

router.get('/tasks/:id', TaskController.geTaskById)

router.post('/tasks', TaskController.postTask)

router.put('/tasks/:id', TaskController.updateTask)

router.delete('/tasks/:id', TaskController.deleteTask)

export default router;