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

router.get('/adminProducts',mainController.adminProducts);

router.get('/adminModiProducts',mainController.adminModiProducts);

router.get('/adminModiProduct',mainController.adminModiProduct);

router.get('/adminDeleteProducts',mainController.adminDeleteProducts);

router.get('/adminAddProduct',mainController.adminAddProduct);

module.exports = router;