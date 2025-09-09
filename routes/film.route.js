import express from 'express';
import filmController from '../controllers/film.controller.js';
// ici, on gere les routes relatives aux films
const router = express.Router();

// Mapping entre route et controleur
router.get('/', filmController.show);
router.get('/:id', filmController.remove);
router.post('/', filmController.add);


export default router;