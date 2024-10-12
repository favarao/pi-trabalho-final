//verificar se está autenticado
function isAuthenticated(req, res, next) {
    if (req.session && req.session.autenticado == true) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

export default isAuthenticated;