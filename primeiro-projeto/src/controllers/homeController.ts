import { Request, Response } from 'express';
import { Product } from '../models/Product';

export function listInfo(req: Request, res: Response) {
  const list = Product.getAll();

  res.render('home', {
    name: 'Francisco',
    age: 42,
    showAge: true,
    products: list,
    frases: [],
  });
}
