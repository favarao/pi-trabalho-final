import express from 'express';
import AuthController from '../controllers/AuthController.js';
import CandidatoController from '../controllers/CandidatoController.js';
import PartidoController from '../controllers/PartidoController.js';
import autenticado from '../middleware/auth.js';


const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login');
});

//pagina de login
router.get('/login', AuthController.loginView);

//login
router.post('/login', AuthController.autenticar);

//logout
router.get('/sair', AuthController.logout);

//paginas
router.use('/candidatos', autenticado,express.static('views/candidatos'));
router.use('/partidos', autenticado,express.static('views/partidos'));
router.use('/menu', autenticado,express.static('views/menu.html'));

//rotas partido
router.get('/api/partidos', autenticado, PartidoController.getPartidos);
router.get('/api/partido/:id',autenticado, PartidoController.getPartido);
router.post('/api/partido',autenticado, PartidoController.insertPartido);
router.put('/api/partido',autenticado, PartidoController.updatePartido);
router.delete('/api/partido/:id', autenticado, PartidoController.deletePartido);

//rotas candidato
router.get('/api/candidatos', autenticado, CandidatoController.getCandidatos);
router.get('/api/candidato/:id', autenticado, CandidatoController.getCandidato);
router.post('/api/candidato', autenticado, CandidatoController.insertCandidato);
router.put('/api/candidato', autenticado, CandidatoController.updateCandidato);
router.delete('/api/candidato/:id', autenticado, CandidatoController.deleteCandidato);

export default router;