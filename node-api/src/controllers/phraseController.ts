import { Request, Response } from 'express';
import { Phrase } from '../models/phrase';

export const welcome = (req: Request, res: Response) => {
  res.json({ message: 'Bem vindo!' });
};

export const createPhrase = async (req: Request, res: Response) => {
  const { author, text } = req.body;

  const newPhrase = await Phrase.create({ author, text });

  res.status(201);
  res.json(newPhrase);
};

export const listPhrase = async (req: Request, res: Response) => {
  const phrases = await Phrase.findAll();

  res.json({ phrases });
};

export const getPhrase = async (req: Request, res: Response) => {
  const { id } = req.params;
  const phrase = await Phrase.findByPk(id);

  if (phrase) {
    res.json(phrase);
  } else {
    res.json({ error: 'Frase não encontrada' });
  }
};

export const updatePhrase = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { author, text } = req.body;

  let phrase = await Phrase.findByPk(id);

  if (phrase) {
    phrase.author = author;
    phrase.text = text;

    await phrase.save();
    res.json(phrase);
  } else {
    res.json({ error: 'Frase não encontrada' });
  }
};

export const deletePhrase = async (req: Request, res: Response) => {
  const { id } = req.params;

  const phrase = await Phrase.findByPk(id);

  if (phrase) {
    await Phrase.destroy({ where: { id } });
    res.status(200);
    res.json({ message: 'Frase excluída com sucesso' });
  } else {
    res.status(404);
    res.json({ message: 'Frase não encontrada' });
  }
};
