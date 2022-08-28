function authMiddleware(req,res,next){
    if(req.session.usuarioLogeado != undefined){
        next();
    }else{
        res.send("Pagina para solo usuarios");
    }
}

module.exports = authMiddleware;