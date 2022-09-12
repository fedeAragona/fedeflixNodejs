const path = require('path');
const fs = require('fs');
const jsonPath = path.join(__dirname,'../database/contact.json');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Script } = require('vm');

const json = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));


const allContacts = json.map(e => {
    return {
      name: e.name,
      email: e.email,
      topic: e.topic,
      text: e.text,
      date: e.date,
    }
  }) 

const controller = {
    intro: (req,res) => {
        res.render(path.join(__dirname,'../views/intro'));
    },
    home: (req,res) => {
        const usuarioLogeado = req.session.usuarioLogeado;
        db.Producto.findAll()
            .then(productos => {
                res.render(path.join(__dirname,'../views/home'), {productos, usuarioLogeado})
            })
      //  res.render(path.join(__dirname,'../views/home'), {usuarioLogeado});
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
        res.render(path.join(__dirname,'../views/register'));
    },

    login: (req,res) => {
        res.render(path.join(__dirname,'../views/login'));
    },

    admin: (req,res) => {
        res.render(path.join(__dirname,'../views/admin'));
    },

    descuentos: (req,res) => {
        const usuarioLogeado = req.session.usuarioLogeado;
        res.render(path.join(__dirname,'../views/descuentos'), {usuarioLogeado});
    },

    product: (req,res) => {
        const usuarioLogeado = req.session.usuarioLogeado;
        res.render(path.join(__dirname,'../views/product'), {usuarioLogeado});
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
    
};

module.exports = controller;
