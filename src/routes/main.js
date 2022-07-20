const express = require('express');
const mainController = require('../controllers/controllersMain');
const router = express.Router();

router.get('/', mainController.intro);

router.get('/home', mainController.home);

router.get('/contact', mainController.contact);

router.get('/register', mainController.register);

router.get('/login',mainController.login);

router.get('/aboutUs',mainController.aboutUs);

router.get('/admin',mainController.admin);

router.get('/descuentos',mainController.descuentos);

router.post('/addContact', mainController.postContact);

module.exports = router;