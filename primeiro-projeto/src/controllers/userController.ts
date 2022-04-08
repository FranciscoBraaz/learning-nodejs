import { Request, Response } from 'express';

export function getAge(req: Request, res: Response) {
  res.render('contato');
}

export function postAge(req: Request, res: Response) {
  const name: string = req.body.nome as string;

  res.render('contato', {
    name,
  });
}
