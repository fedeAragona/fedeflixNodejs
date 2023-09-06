const express = require('express');
const mainController = require('../controllers/controllersMain');
const router = express.Router();
const guestMiddleware = require("../middlewares/guestMiddleware");

router.get('/', mainController.intro);
router.get('/home', mainController.home);
router.get('/contact', mainController.contact);
router.get('/register', guestMiddleware,mainController.register);
router.get('/login',guestMiddleware,mainController.login);
router.get('/aboutUs',mainController.aboutUs);
router.get('/admin',mainController.admin);
router.get('/nuestrasPelis',mainController.nuestrasPelis);
router.get('/nuestrasPelis/:id',mainController.nuestrasPelisDetail);
router.get('/pelicula/:id',mainController.pelicula);
router.get('/logout',mainController.logout);

router.post('/addContact', mainController.postContact);

module.exports = router;