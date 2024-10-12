import express from 'express';
import session from 'express-session';
import apiRoutes from './routes/Routes.js';

//session de 30 minutos


const host = '0.0.0.0';
const porta = 3000;
const app = express();

app.use(session({
    secret: 'unoeste', //chave para criptografia
    resave: true,
    saveUninitialized: true,
    cookie: {  
        maxAge: 1000 * 60 * 30 // 30 minutos
    }
}));


app.use(express.json());
//a biblioteca qs será utilizada para tratar os parâmetros da requisição
app.use(express.urlencoded({ extended: true }));
app.use('/', apiRoutes);
app.use('/node_modules', express.static('./node_modules'));
app.use(express.static('./public'));
app.use(express.static('/views')); // Serve todos os arquivos na pasta views





app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});

