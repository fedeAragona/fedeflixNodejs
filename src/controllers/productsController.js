const db = require('../database/models');
const path = require('path');
const sequelize = db.sequelize;
const session = require('express-session');
const { Script } = require('vm');
const { Op } = require("sequelize");


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
            estado: 1,
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
        db.Producto.findAll({
            where:{
                estado:1
            }
        })
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

    update: async (req,res) => {

        const desc = await db.Producto.findByPk(parseInt(req.body.id));
        const d1 = req.body.descuento1 ? true : false;
        const d2= req.body.descuento2 ? true : false;
        
        const nombre= req.body.nombre;
        const precio= req.body.precio;
        const stock= req.body.stock;
        const descripcion= req.body.descripcion;
        const descuento= desc.descuento ? d1 : d2;
        const img= req.file ? req.file.filename : req.body.img1;
        const idcategoria= req.body.categoria;


        try {
            await db.Producto.update(
                {
                    nombre,
                    precio,
                    stock,
                    descripcion,
                    descuento,
                    img,
                    idcategoria
                },
                {
                     where:{
                        id: parseInt(req.body.id)
                     }
                }
            );
            res.redirect('/search?id='+ req.body.id);
        } catch (error) {
            console.log(error);
        }
     },
    

     adminProducts: (req,res) => {
        res.render(path.join(__dirname,'../views/adminProducts'));
        },
    
    adminModiProducts: (req,res) => {
        res.render(path.join(__dirname,'../views/adminModiProducts'));
        },
    
    adminDeleteProducts: (req,res) => {
        res.render(path.join(__dirname,'../views/adminDeleteProducts'));
        },
    
    adminAddProduct: (req,res) => {
        res.render(path.join(__dirname,'../views/adminAddProduct'));
        },

        delete: async (req,res) => {
            try {
                await db.Producto.update(
                    {
                        estado:0
                    },
                    {
                        where: {
                            id: req.params.id,
                        }
                    }
                );
                res.redirect('/adminListarProducts');
            } catch (error) {
                console.log(error);
            }
        },


        searchProduct: async (req, res) => {
            let search = req.params.search;
            const usuarioLogeado = req.session.usuarioLogeado;
            const productos = await db.Producto.findAll({Attributes: ['idcategoria'], group: ['idcategoria']},{where:{estado:1}})
            await db.Producto.findAll({
              
                where: {
                  
                    [Op.or]:[
                    {idcategoria: {[Op.like]: "%" + search + "%"}},
                    {nombre: {[Op.like]: "%" + search + "%"}}
                  ]   
                },
            })
            .then((productFilter) => {
              res.render("search", {
                styles: "allProducts",
                buscarProductos: productFilter,
                usuarioLogeado,
                productos
                });
                
            })
            .catch((error) => {
              console.error(error);
            })
          },
};

module.exports = productsController;