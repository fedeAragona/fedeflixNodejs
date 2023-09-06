const express = require('express');
const router = express.Router();
const peliculasApiController = require('../../controllers/api/apiPeliculaController');

//Lista de peliculas
router.get('/', peliculasApiController.list)

//Detalle de pelicula
router.get('/:id', peliculasApiController.detail)

module.exports = router;