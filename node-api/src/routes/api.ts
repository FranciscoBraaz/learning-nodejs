import { Router } from 'express';
import * as PhraseController from '../controllers/phraseController';

const router = Router();

router.get('/', PhraseController.welcome);
router.post('/frases', PhraseController.createPhrase);
router.get('/frases', PhraseController.listPhrase);
router.get('/frase/:id', PhraseController.getPhrase);
router.put('/frase/:id', PhraseController.updatePhrase);
router.delete('/frase/:id', PhraseController.deletePhrase);

export default router;
