const db = require('../database/models');
const path = require('path');
const sequelize = db.sequelize;
const session = require('express-session');
const { Script } = require('vm');



const productsController = {
    
    postProduct: async (req, res) => {

        const newProduct = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            stock: req.body.stock,
            descripcion: req.body.descripcion,
            descuento: req.body.descuento ? true : false,
            img: req.file ? req.file.filename : "productDefault.png",
            idcategoria: req.body.categoria,
        }

        try{
            await db.Producto.create(newProduct);
            res.redirect('/home');
        }
        catch(error){
            console.log(error);
        }
    },

    list: (req, res) => {
        db.Producto.findAll()
            .then(productos => {
                res.render('adminListarProducts.ejs', {productos})
            })
    },

    search: async (req, res) => {
            try{
                const product = await db.Producto.findByPk(parseInt(req.query.id))
                product ? res.render('adminProductDetail.ejs',{product}) : res.redirect('/adminModiProducts');
            } 
            catch (error){
                console.log(error);
            }
      },

      adminModiProducts: (req,res) => {
        res.render(path.join(__dirname,'../views/adminModiProducts'));
        },
};

module.exports = productsController;