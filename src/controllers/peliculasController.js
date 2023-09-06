const db = require('../database/models');
const path = require('path');
const { Op } = require("sequelize");
const axios = require('axios');

async function searchOMDB(search) {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${search}&apikey=42cb52`);
      return response.data.Search;
    } catch (error) {
      console.error(error);
      return [];
    }
}

const peliculasController = {
    
    postPelicula: async (req, res) => {

        const newPelicula = {
            nombre: req.body.nombre,
            rating: req.body.rating,
            duracion: req.body.duracion,
            descripcion: req.body.descripcion,
            img: req.file ? req.file.filename : "peliculaDefault.png",
            genero: req.body.genero,
            estado: 1,
        }
        try{
            await db.Pelicula.create(newPelicula);
            res.redirect('/home');
        }
        catch(error){
            console.log(error);
        }
    },

    addPeliculaDesdeOmdb: async (req, res) => {
       
        const newPelicula = {
            nombre: req.body.nombre,
            rating: req.body.rating,
            duracion: req.body.duracion,
            descripcion: req.body.descripcion,
            img: req.body.imagen,
            genero: req.body.genero,
            estado: 1,
        }
        try{
            await db.Pelicula.create(newPelicula);
            res.redirect('/home');
        }
        catch(error){
            console.log(error);
        }
    },

    list: (req, res) => {
        db.Pelicula.findAll({
            where:{
              estado:1
            }
        })
        .then(peliculas => {
            res.render('adminListarPeliculas.ejs', {peliculas})
         })
    },

    search: async (req, res) => {
        try{
            const pelicula = await db.Pelicula.findByPk(parseInt(req.query.id))
            pelicula ? res.render('adminPeliculaDetail.ejs',{pelicula}) : res.redirect('/adminModiPeliculas');
        } 
        catch (error){
            console.log(error);
        }
    },

    update: async (req,res) => {  
        const nombre = req.body.nombre;
        const rating = req.body.rating;
        const descripcion = req.body.descripcion;
        const img = req.file ? req.file.filename : req.body.img1;
        const genero = req.body.genero;
        const duracion = req.body.duracion;

        try {
            await db.Pelicula.update(
                {
                    nombre,
                    rating,
                    descripcion,
                    img,
                    duracion,
                    genero
                },
                {
                    where:{
                    id: parseInt(req.body.id)
                    }
                }
            );
        res.redirect('/search?id='+ req.body.id);
        }catch (error) {
            console.log(error);
        }
    },
    
    adminPeliculas: (req,res) => {
        res.render(path.join(__dirname,'../views/adminPeliculas'));
    },
    
    adminModiPeliculas: (req,res) => {
        res.render(path.join(__dirname,'../views/adminModiPeliculas'));
        },
    
    adminAddPelicula: (req,res) => {
        res.render(path.join(__dirname,'../views/adminAddPelicula'));
        },

    delete: async (req,res) => {
        try {
            await db.Pelicula.update(
                {
                    estado:0
                },
                {
                    where: {
                        id: req.params.id,
                    }
                }
            );
        res.redirect('/adminListarPeliculas');
        }catch (error) {
            console.log(error);
        }
    },

    searchPeliculas: async (req, res) => {
        let search = req.params.search;
        const usuarioLogeado = req.session.usuarioLogeado;

        const databaseResults = await db.Pelicula.findAll({
            where: {
              [Op.or]: [{ nombre: { [Op.like]: "%" + search + "%" } }],
              estado: 1
            },
        });
        const omdbResults = await searchOMDB(search);
        res.render("search", {
            styles: "allProducts",
            buscarPeliculas: databaseResults,
            omdbPeliculas: omdbResults,
            usuarioLogeado,
            search
        });
    },
};

module.exports = peliculasController;