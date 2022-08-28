function guestMiddleware(req,res,next){
    if(req.session.usuarioLogeado == undefined){
        next();
    }else{
        res.redirect("/perfil/" + req.session.usuarioLogeado.id);
    }
}

module.exports = guestMiddleware;