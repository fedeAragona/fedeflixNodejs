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
        res.render(path.join(__dirname,'../views/login'));
    },
    admin: (req,res) => {
        res.render(path.join(__dirname,'../views/admin'));
    },
    adminAddProduct: (req,res) => {
        res.render(path.join(__dirname,'../views/adminAddProduct'));
    },
    adminProducts: (req,res) => {
        res.render(path.join(__dirname,'../views/adminProducts'));
    }
};

module.exports = controller;
