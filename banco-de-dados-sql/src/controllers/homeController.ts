import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { Product } from '../models/Product';
import { User } from '../models/User';

export const home = async (req: Request, res: Response) => {
  // const user = User.build({
  //   name: 'Claudia',
  // });

  // await user.save();

  // const user = await User.create({
  //   name: 'Davina',
  //   age: 20,
  // });

  // await User.update(
  //   { age: 18 },
  //   {
  //     where: {
  //       age: {
  //         [Op.lt]: 18,
  //       },
  //     },
  //   },
  // );

  let users = await User.findAll({
    attributes: ['name', 'age', 'id', 'firstLetter'],
    order: [['name', 'DESC']],
  });

  let age: number = 90;
  let showOld: boolean = false;

  if (age > 50) {
    showOld = true;
  }

  let list = Product.getAll();
  let expensiveList = Product.getFromPriceAfter(12);

  res.render('pages/home', {
    name: 'Bonieky',
    lastName: 'Lacerda',
    showOld,
    products: list,
    expensives: expensiveList,
    frasesDoDia: [],
    users,
  });
};
