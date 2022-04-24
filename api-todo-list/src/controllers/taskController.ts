import { Request, Response } from 'express';
import Task from '../models/Task';

export const getTask = async (req: Request, res: Response) => {
  let tasks = await Task.find({});

  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title) {
    res.status(400);
    res.json({ message: 'A atividade precisa ter um título' });
  }

  try {
    let newTask = await Task.create({ title });
    res.json(newTask);
  } catch (error) {
    res.status(500);
    res.json({ message: 'Erro interno do servidor' });
  }
};
