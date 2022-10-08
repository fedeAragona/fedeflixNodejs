const path = require('path');
const fs = require('fs');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Script } = require('vm');


const controller = {
    intro: (req,res) => {
        res.render(path.join(__dirname,'../views/intro'));
    },
    home: (req,res) => {
        const usuarioLogeado = req.session.usuarioLogeado;
        db.Producto.findAll({
            where: {
                estado: 1,
            }
        })
            .then(productos => {
                res.render(path.join(__dirname,'../views/home'), {productos, usuarioLogeado})
            })
    },

    contact: (req,res) => {
        const usuarioLogeado = req.session.usuarioLogeado;
        res.render(path.join(__dirname,'../views/contact'), {usuarioLogeado});
    },

    aboutUs: (req,res) => {
        const usuarioLogeado = req.session.usuarioLogeado;
        res.render(path.join(__dirname,'../views/aboutUs'), {usuarioLogeado});
    },

    register: (req,res) => {
        const buscarEmail = null;
        res.render(path.join(__dirname,'../views/register'), {buscarEmail});
    },

    login: (req,res) => {
        const usuario = 0;
        res.render(path.join(__dirname,'../views/login'),{usuario});
    },

    admin: (req,res) => {
        res.render(path.join(__dirname,'../views/admin'));
    },

    descuentos: (req,res) => {
        const usuarioLogeado = req.session.usuarioLogeado;
        db.Producto.findAll({
            where: {
                descuento:1,
            }
        })
            .then(productos => {
                res.render(path.join(__dirname,'../views/descuentos'), {productos, usuarioLogeado})
            })
    },

    product: async (req,res) => {
            try{
                const buscarProducto = await db.Producto.findByPk(req.params.id)
                const usuarioLogeado = req.session.usuarioLogeado;
                res.render(path.join(__dirname,'../views/product'),{buscarProducto, usuarioLogeado});
            }
            catch(error){
                console.log(error);
            }
        },

    postContact: async (req, res) => {

        const newContact = {
            nombre: req.body.nombre,
            email: req.body.email,
            asunto: req.body.asunto,
            consulta: req.body.consulta,
        }

        try{
            await db.Contacto.create(newContact);
            res.redirect('/home');
        }
        catch(error){
            console.log(error);
        }
    },

    logout: (req,res) => {
        req.session.usuarioLogeado = null;
        res.redirect('/home');
    },
    
    faq: (req,res) => {
        const usuarioLogeado = req.session.usuarioLogeado;
        res.render(path.join(__dirname,'../views/faq'),{usuarioLogeado});
    },
};

module.exports = controller;
