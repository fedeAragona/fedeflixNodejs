const db = require('../database/models');
const path = require('path');
const sequelize = db.sequelize;
const session = require('express-session');
const { Script } = require('vm');
const e = require('express');

//Otra forma de llamar a los modelos
const Usuario = db.Usuario;

const usersController = {
    'list': (req, res) => {
        db.Usuario.findAll()
            .then(usuarios => {
                res.render('users2.ejs', {usuarios})
            })
    },
    'detail': async (req, res) => {
        try{
            const usuarios = await db.Usuario.findByPk(req.params.id)
            res.render('userEdit2.ejs', {usuarios});
        } 
        catch (error){
            console.log(error);
        }
    },

    postUser: async (req, res) => {

     const buscarEmail = await db.Usuario.findOne({
                where:{
                    email: req.body.email,
                }
            })
            if(buscarEmail){
                res.render('register.ejs', {buscarEmail})
            }else{
                const newUser = {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    contrasenia: req.body.contrasenia,
                    img: req.file ? req.file.filename : "userDefault.png",
                    estado: 1,
                    admin: 0
                }
        
                try{
                    await db.Usuario.create(newUser);
                    const user = await db.Usuario.findOne({
                        where:{
                            email: req.body.email
                        }
                    });
                    req.session.usuarioLogeado = user;
                    res.redirect('/home');
                }catch(error){
                    console.log(error);
                }
            }
    },

    perfil: async (req,res)=>{
        try{
            const perfil = await db.Usuario.findByPk(req.params.id)
            const usuarioLogeado = req.session.usuarioLogeado;
            res.render(path.join(__dirname,'../views/perfil'),{perfil, usuarioLogeado});
        }
        catch(error){
            console.log(error);
        }
    },

    update: async (req,res) => {
        const {
            nombre,
            apellido,
            email,
            contrasenia,
            img,
        } = req.body;
    
        try {
            await db.Usuario.update(
                {
                    nombre,
                    apellido,
                    email,
                    contrasenia,
                    img,
                    estado:1
                },
                {
                    where: {
                        id: req.body.id,
                    }
                }
            );
            if(req.session.usuarioLogeado==null){
                req.session.usuarioLogeado = await db.Usuario.findOne({
                    where:{
                        email: req.body.email
                    }
                });
            }
            res.redirect('/edit/'+ req.body.id);
        } catch (error) {
            console.log(error);
        }
    },

    delete: async (req,res) => {
        try {
            await db.Usuario.update(
                {
                    estado:0
                },
                {
                    where: {
                        id: req.params.id,
                    }
                }
            );
            res.redirect('/users2');
        } catch (error) {
            console.log(error);
        }
    },

    processLogin: async (req,res) =>{
        try{
            
            const usuario = await db.Usuario.findOne({
                where:{
                    email: req.body.email,
                    contrasenia: req.body.password
                }
             });

             if(usuario != null){
                if(usuario.estado == 1){
                    req.session.usuarioLogeado = usuario;
                    res.redirect("/home");
                }else{
                    const usuario = 1;
                    res.render("login.ejs", {usuario});
                }
             }else{
                 const usuario = 2
                 res.render("login.ejs", {usuario});
             }
           
        }catch(error){
            console.log(error);
        }
    },

    updateUserParticular: async (req,res) => {
        const {
            nombre,
            apellido,
            email,
            contrasenia,
            img,
        } = req.body;
    
        try {
            await db.Usuario.update(
                {
                    nombre,
                    apellido,
                    email,
                    contrasenia,
                    img,
                    estado:1
                },
                {
                    where: {
                        id: req.body.id,
                    }
                }
            );
            req.session.usuarioLogeado = await db.Usuario.findOne({
                where:{
                    email: req.body.email
                }
            });
            res.redirect('/perfil/'+ req.body.id);
        } catch (error) {
            console.log(error);
        }
    },

}

module.exports = usersController;