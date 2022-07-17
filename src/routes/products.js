const express = require("express");
const controllersProducts = require("../controllers/controllersProducts");

const router = express.Router();


router.get("/adminListarProducts", controllersProducts.allProducts);
router.post('/addProduct',controllersProducts.postProduct);
router.get('/search',controllersProducts.search);
router.delete('/deleteProduct/:id',controllersProducts.delete);
router.get('/productEdit/:id', controllersProducts.edit);
router.put('/productEdit', controllersProducts.editConfirm);


module.exports = router;