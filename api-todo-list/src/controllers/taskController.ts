import { Request, Response } from 'express';
import Task from '../models/Task';

export const getTask = async (req: Request, res: Response) => {
  let tasks = await Task.find({});
  console.log(tasks);

  res.json(tasks);
};
