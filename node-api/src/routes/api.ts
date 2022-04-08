import { Router, Response, Request } from 'express';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
  res.json({ pong: true });
});

router.get('/random', (req: Request, res: Response) => {
  res.json({ num: Math.random() });
});

router.get('/name', (req, res) => {
  const name = req.query.name;

  res.json({ name });
});

export default router;
