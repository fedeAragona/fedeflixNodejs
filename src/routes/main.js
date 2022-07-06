const express = require('express');
const mainController = require('../controllers/controllersMain');
const router = express.Router();

router.get('/', mainController.intro);

router.get('/home', mainController.home);

router.get('/contact', mainController.contact);

router.get('/register', mainController.register);

router.get('/login',mainController.login);

router.get('/admin',mainController.admin);

router.get('/adminProducts',mainController.adminProducts);

router.get('/adminAddProduct',mainController.adminAddProduct);



module.exports = router;