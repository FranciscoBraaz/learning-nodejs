import { Request, Response } from 'express';

import { Product } from '../models/Product';
import User from '../models/User';

export const home = async (req: Request, res: Response) => {
  //   await User.updateMany({ age: { $lte: 40 } }, { age: 85 });
  // await User.findByIdAndDelete('62644e4b3fb89a12227cbeaa');
  let users = await User.find({}).sort({ 'name.first_name': 1 });
  //   console.log(users);

  res.render('pages/home', {
    users,
  });
};
