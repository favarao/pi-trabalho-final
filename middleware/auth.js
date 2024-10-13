//verificar se está autenticado
function isAuthenticated(req, res, next) {
    if (req.session && req.session.autenticado == true)
        return next();
    else
    {
        if (req.originalUrl.startsWith('/api/'))
            return res.status(403).json({ status:false, message: 'Sem permissão' });
        return res.redirect('/login');
    }
}

export default isAuthenticated;