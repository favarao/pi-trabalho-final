class AuthController{
    async loginView(req, res){
        if(req.session && req.session.user){
            res.redirect('/partidos');
        }
        else{
            res.sendFile('login.html', { root: 'views' });
        }
        
    }

    async autenticar(req, res){
        const usuario = req.body.usuario;
        const senha = req.body.senha;
        console.log(req.body);
        if(usuario === 'joao' && senha === 'fipp'){
            req.session.autenticado = true;
            res.status(200).json({ status: true, message: 'Autenticação bem-sucedida' });
        }
        else
            res.status(401).json({ status: false, message: 'Usuário ou senha inválidos' });
    }

    async logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    }
}

export default new AuthController();