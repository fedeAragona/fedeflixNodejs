const path = require('path');

const controller = {
    intro: (req,res) => {
        
        res.render(path.join(__dirname,'../views/intro'));
    },
    home: (req,res) => {
        
        res.render(path.join(__dirname,'../views/home'));
    },

    contact: (req,res) => {
      
        res.render(path.join(__dirname,'../views/contact'));
    },

    register: (req,res) => {
        
        res.render(path.join(__dirname,'../views/register'));
    },

    login: (req,res) => {
        res.send(path.join(__dirname,'../views/login'));
    }
};

module.exports = controller;
