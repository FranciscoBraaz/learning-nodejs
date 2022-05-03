import { Request, Response } from 'express';
import User from '../models/User';

export const createUser = async (req: Request, res: Response) => {
  const data = req.body;
  let newUser = new User();

  try {
    newUser.name.first_name = data.first_name;
    newUser.name.last_name = data.last_name;
    newUser.age = Number(data.age);
    newUser.email = data.email;
    newUser.interests = data.interests.split(', ');

    await newUser.save();

    console.log('Usuário criado com sucesso');
  } catch (error) {
    console.log('Erro na criação do usuário:', error);
  }

  res.redirect('/');
};

export const incrementAge = async (req: Request, res: Response) => {
  const { id } = req.params;
  let user = await User.findById(id);
  if (user) {
    user.age++;
    await user.save();
  }

  res.redirect('/');
};
