const express = require("express");
const controllersProducts = require("../controllers/controllersProducts");

const router = express.Router();


router.get("/adminListarProducts", controllersProducts.allProducts);
router.post('/addProduct',controllersProducts.postProduct);



module.exports = router;