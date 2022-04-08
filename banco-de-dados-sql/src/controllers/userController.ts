import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { User } from '../models/User';

export const show = (req: Request, res: Response) => {
  res.render('pages/home');
};

export const incrementUser = async (req: Request, res: Response) => {
  let idUser = req.params.id;
  let results = await User.findAll({
    where: {
      id: idUser,
    },
  });
  if (results.length > 0) {
    let user = results[0];
    user.age++;
    await user.save();
  }

  res.redirect('/');
};

export const decrementUser = async (req: Request, res: Response) => {
  let idUser = req.params.id;
  let results = await User.findAll({
    where: {
      id: idUser,
    },
  });
  if (results.length > 0) {
    let user = results[0];
    user.age--;
    await user.save();
  }

  res.redirect('/');
};

export const deleteUser = async (req: Request, res: Response) => {
  let idUser = req.params.id;

  let results = await User.findAll({
    where: {
      id: idUser,
    },
  });

  if (results.length > 0) {
    let user = results[0];
    await user.destroy();
  }

  res.redirect('/');
};

export const createUser = async (req: Request, res: Response) => {
  const { name, age } = req.body;

  if (!name) {
    res.redirect('/');
    return;
  }

  if (age != '') {
    await User.create({
      name,
      age: parseInt(age),
    });
  } else {
    await User.create({
      name,
    });
  }

  res.redirect('/');
};
