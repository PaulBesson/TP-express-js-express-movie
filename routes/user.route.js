import express from 'express';
import userController from '../controllers/user.controller.js';
// ici, on gere les routes relatives aux users
const router = express.Router();

// Mapping entre route et controleur
router.get('/login', userController.showLogin);
router.get('/signup', userController.showSignup);
router.get('/account', userController.showAccount);
router.get('/disconnect', userController.disconnect);
router.get('/addFavorites/:filmId', userController.addFavorites);
router.get('/removeFavorites/:filmId', userController.removeFavorites);
router.post('/signup', userController.addUser);
router.post('/login', userController.loginUser);


export default router;