import { Router } from 'express';

import * as HomeController from '../controllers/homeController';
import * as InfoController from '../controllers/infoController';
import * as UserController from '../controllers/userController';

import multer from 'multer';

const upload = multer({ dest: './tmp' });

const router = Router();

router.get('/', HomeController.home);

router.get('/contato', InfoController.contato);
router.get('/sobre', InfoController.sobre);

router.get('/usuario/:id/addidade', UserController.incrementAge);
router.post('/usuario', UserController.createUser);

router.post(
  '/upload',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'gallery', maxCount: 3 },
  ]),
  UserController.uploadFile,
);

export default router;
