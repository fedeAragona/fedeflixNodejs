const path = require('path');
const fs = require('fs');
const jsonPath = path.join(__dirname,'../database/contact.json');

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
        res.render(path.join(__dirname,'../views/home'), {usuarioLogeado});
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

    postContact: (req,res) =>{
        const newName = req.body.name;
        const newEmail = req.body.email;
        const newTopic = req.body.topic;
        const newText = req.body.text;

        const obj = {
            name: newName,
            email: newEmail,
            topic: newTopic,
            text: newText,
            date: new Date().toDateString(),
        }

        allContacts.push(obj);
        
        fs.writeFile(jsonPath,JSON.stringify(allContacts),(error) => {
            if(error){
                res.send(error);
            }else{
                res.redirect('/home');
            }
        })
    },

};

module.exports = controller;
