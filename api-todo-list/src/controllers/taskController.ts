import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Task from '../models/Task';

export const getTask = async (req: Request, res: Response) => {
  let tasks = await Task.find({});

  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const { title, done } = req.body;

  if (!title) {
    res.status(400);
    res.json({ message: 'A atividade precisa ter um título' });
  }

  try {
    let newTask = await Task.create({ title, done: done ? done : false });
    res.json(newTask);
  } catch (error) {
    res.status(500);
    res.json({ message: 'Erro interno do servidor' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const taskChanges = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    res.json({ message: 'Id inválido' });
    return;
  }

  let task = await Task.findById(id);
  if (!task) {
    res.status(404).json({ message: 'Tarefa não encontrada' });
    return;
  }

  Object.assign(task, taskChanges);
  let result = await task!.save();

  res.json(result);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    res.json({ message: 'Id inválido' });
    return;
  }

  try {
    let result = await Task.findByIdAndDelete(id);

    if (!result) {
      res.status(404).json({ message: 'Tarefa não encontrada' });
      return;
    }

    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
