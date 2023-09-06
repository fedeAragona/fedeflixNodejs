const express = require('express');
const router = express.Router();
const peliculasController = require('../controllers/peliculasController.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'../../public/images/peliculas'));
    },
    filename: (req, file, cb)=>{
        const newFile = 'pelicula-' + Date.now() + path.extname(file.originalname);
        cb(null,newFile);
    }
});

const upload = multer({ storage });

router.post('/addPelicula',upload.single('img'),peliculasController.postPelicula);
router.post('/addPeliculaDesdeOmdb',upload.single('img'),peliculasController.addPeliculaDesdeOmdb);

router.get("/adminListarPeliculas", peliculasController.list);
router.get('/search',peliculasController.search);
router.get('/adminModiPeliculas',peliculasController.adminModiPeliculas);
router.get('/adminPeliculas',peliculasController.adminPeliculas);
router.get('/adminAddPelicula',peliculasController.adminAddPelicula);
router.get("/search/:search", peliculasController.searchPeliculas);

router.put('/editPelicula',upload.single('img2'),peliculasController.update);

router.delete('/deletePelicula/:id', peliculasController.delete);

module.exports = router;