const path = require('path');
const axios = require('axios');
const db = require('../database/models');

const controller = {
    intro: (req,res) => {
        res.render(path.join(__dirname,'../views/intro'));
    },

    home: async (req, res) => {
        try {
            const usuarioLogeado = req.session.usuarioLogeado;
            // Llamada a la API de OMDB para obtener datos de películas
            const omdbApiKey = '42cb52';
            const omdbResponse = await axios.get(`http://www.omdbapi.com/?s=movie&apikey=${omdbApiKey}`);

            // Extraer datos de películas de la respuesta de la API
            const peliculas = omdbResponse.data.Search;

            // Renderizar la vista de home con la grilla de películas
            res.render(path.join(__dirname, '../views/home'), { peliculas, usuarioLogeado });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener datos de películas desde OMDB.');
        }
    },

    contact: (req,res) => {
        const usuarioLogeado = req.session.usuarioLogeado;
        res.render(path.join(__dirname,'../views/contact'), {usuarioLogeado})
    },

    aboutUs: async (req,res) => {
        try{
            const peliculasGuardadas = await db.UsuariosXPeliculas.findAll({
                where: {
                  idusuario: 1, // Filtrar por el ID del usuario logeado
                },
                include: [
                  {
                    model: db.Pelicula, // Relación con la tabla de películas
                    as: 'pelicula', // Alias para la relación
                  },
                ],
              });
            const usuarioLogeado = req.session.usuarioLogeado;
            res.render(path.join(__dirname, '../views/aboutUs'), {
                peliculasGuardadas,
                usuarioLogeado,
              });
        }
        catch(error){
                console.log(error);
        }
    },

    register: (req,res) => {
        const buscarEmail = null;
        res.render(path.join(__dirname,'../views/register'), {buscarEmail})
    },

    login: (req,res) => {
        const usuario = 0;
        res.render(path.join(__dirname,'../views/login'), {usuario})
    },

    admin: (req,res) => {
        res.render(path.join(__dirname,'../views/admin'));
    },

    nuestrasPelis: async (req,res) => {
        try{
            const buscarPeliculas = await await db.Pelicula.findAll({
                where:{
                    estado:1
                }
            });
            const usuarioLogeado = req.session.usuarioLogeado;
            res.render(path.join(__dirname,'../views/nuestrasPelis'),{buscarPeliculas, usuarioLogeado});
        }
        catch(error){
                console.log(error);
        }
    },

    nuestrasPelisDetail: async (req,res) => {
        try{
            const buscarPelicula = await db.Pelicula.findByPk(req.params.id)
            const usuarioLogeado = req.session.usuarioLogeado;
            res.render(path.join(__dirname,'../views/nuestrasPelisDetail'),{buscarPelicula, usuarioLogeado});
        }
        catch(error){
            console.log(error);
        }
    },

    pelicula: async (req,res) => {
        try{
            const imdbID = req.params.id;
            console.log(imdbID);
            const omdbApiKey = '42cb52';
            const omdbResponse = await axios.get(`http://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&apikey=${omdbApiKey}`);
            const usuarioLogeado = req.session.usuarioLogeado;
            if (omdbResponse.data.Response === 'True') {
                const pelicula = omdbResponse.data;
            res.render(path.join(__dirname,'../views/omdbPelis'),{pelicula, usuarioLogeado});
            }else{
                res.status(404).send('Película no encontrada');
            }
        }
        catch(error){
            console.log(error);
            res.status(500).send('Error al obtener detalles de la película desde OMDB.');
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
};

module.exports = controller;
