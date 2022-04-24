import { Router } from 'express';
import * as TaskController from '../controllers/taskController';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Bem vindo!' });
});

router.get('/tasks', TaskController.getTask);
router.post('/tasks', TaskController.createTask);

export default router;
