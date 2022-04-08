import { Router, Response, Request } from 'express';
import * as HomeController from '../controllers/homeController';
import * as UserController from '../controllers/userController';

const router = Router();

router.get('/', HomeController.listInfo);

router.get('/idade', UserController.getAge);

router.post('/idade-resultado', UserController.postAge);

router.get('/sobre', (req: Request, res: Response) => {
  res.send('Página de contato');
});

export default router;
