import { Router } from 'express';

import * as HomeController from '../controllers/homeController';
import * as InfoController from '../controllers/infoController';
import * as UserController from '../controllers/userController';

const router = Router();

router.get('/', HomeController.home);

router.get('/contato', InfoController.contato);
router.get('/sobre', InfoController.sobre);

// router.post('/user', UserController.show);
router.post('/user', UserController.createUser);
router.get('/user-increment/:id', UserController.incrementUser);
router.get('/user-decrement/:id', UserController.decrementUser);
router.get('/user-destroy/:id', UserController.deleteUser);

export default router;
