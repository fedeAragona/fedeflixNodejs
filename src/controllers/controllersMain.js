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
        db.Producto.findAll({Attributes: ['idcategoria'], group: ['idcategoria']},{where:{estado:1}})
            .then(productos => {
                res.render(path.join(__dirname,'../views/home'), {productos, usuarioLogeado})
            })
    },

    contact: (req,res) => {
        const usuarioLogeado = req.session.usuarioLogeado;
        db.Producto.findAll({Attributes: ['idcategoria'], group: ['idcategoria']},{where:{estado:1}})
            .then(productos => {
                res.render(path.join(__dirname,'../views/contact'), {productos, usuarioLogeado})
            })
    },

    aboutUs: (req,res) => {
        const usuarioLogeado = req.session.usuarioLogeado;
        db.Producto.findAll({Attributes: ['idcategoria'], group: ['idcategoria']},{where:{estado:1}})
            .then(productos => {
                res.render(path.join(__dirname,'../views/aboutUs'), {productos, usuarioLogeado})
            })
    },

    register: (req,res) => {
        const buscarEmail = null;
        db.Producto.findAll({Attributes: ['idcategoria'], group: ['idcategoria']},{where:{estado:1}})
        .then(productos => {
            res.render(path.join(__dirname,'../views/register'), {productos, buscarEmail})
        })
    },

    login: (req,res) => {
        const usuario = 0;
        db.Producto.findAll({Attributes: ['idcategoria'], group: ['idcategoria']},{where:{estado:1}})
        .then(productos => {
            res.render(path.join(__dirname,'../views/login'), {productos, usuario})
        })
    },

    admin: (req,res) => {
        res.render(path.join(__dirname,'../views/admin'));
    },

    descuentos: async (req,res) => {
        try{
            const buscarProductos = await await db.Producto.findAll({
                where:{
                    descuento:1,
                    estado:1
                }
            });
            const productos = await db.Producto.findAll({Attributes: ['idcategoria'], group: ['idcategoria']},{where:{estado:1}})
            const usuarioLogeado = req.session.usuarioLogeado;
            res.render(path.join(__dirname,'../views/descuentos'),{buscarProductos, productos, usuarioLogeado});
        }
        catch(error){
                console.log(error);
        }
    },

    product: async (req,res) => {
            try{
                const buscarProducto = await db.Producto.findByPk(req.params.id)
                const productos = await db.Producto.findAll({Attributes: ['idcategoria'], group: ['idcategoria']},{where:{estado:1}})
                const usuarioLogeado = req.session.usuarioLogeado;
                res.render(path.join(__dirname,'../views/product'),{buscarProducto, productos, usuarioLogeado});
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
        db.Producto.findAll({Attributes: ['idcategoria'], group: ['idcategoria']},{where:{estado:1}})
            .then(productos => {
                res.render(path.join(__dirname,'../views/faq'), {productos, usuarioLogeado})
            })
    },

    market: async (req,res) => {
        try{
            const cat = req.params.cat
            const buscarCategoria = await db.Producto.findAll({
                where:{
                    idcategoria: cat,
                    estado:1
                }
            });
            
            const productos = await db.Producto.findAll({Attributes: ['idcategoria'], group: ['idcategoria']},{where:{estado:1}})

            const usuarioLogeado = req.session.usuarioLogeado;
            res.render(path.join(__dirname,'../views/market'),{buscarCategoria, cat, productos, usuarioLogeado});
        }
        catch(error){
            console.log(error);
        }
        
    },
};

module.exports = controller;
