import express from 'express';
import AuthController from '../controllers/AuthController.js';
import autenticado from '../middleware/auth.js';

const router = express.Router();

router.use('/candidatos', autenticado,express.static('views/candidatos'));
router.use('/partidos', autenticado,express.static('views/partidos'));


router.get('/', (req, res) => {
    res.redirect('/login');
});
// Rota para exibir a página de login
router.get('/login', AuthController.loginView);

// Rota para processar o login
router.post('/login', AuthController.autenticar);

// Rota para o logout
router.get('/sair', AuthController.logout);

export default router;