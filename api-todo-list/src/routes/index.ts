import { Router } from 'express';
import * as TaskController from '../controllers/taskController';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Bem vindo!' });
});

router.get('/tarefas', TaskController.getTask);
router.post('/tarefas', TaskController.createTask);
router.patch('/tarefa/:id', TaskController.updateTask);
router.delete('/tarefa/:id', TaskController.deleteTask);

export default router;
