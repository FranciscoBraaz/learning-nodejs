import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Página painel');
});

router.get('/noticias', (req: Request, res: Response) => {
  res.send('Página com listagem de notícias');
});

router.get('/eventos', (req: Request, res: Response) => {
  res.send('Página com listagem de eventos');
});

export default router;
