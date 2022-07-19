const express = require("express");
const controllersProducts = require("../controllers/controllersProducts");
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'../../public/images'));
    },
    filename: (req, file, cb)=>{
        const newFile = 'product-' + Date.now() + path.extname(file.originalname);
        cb(null,newFile);
    }
});

const upload = multer({ storage });

router.get("/adminListarProducts", controllersProducts.allProducts);
router.post('/addProduct',upload.single('img'),controllersProducts.postProduct);
router.get('/search',controllersProducts.search);
router.delete('/deleteProduct/:id',controllersProducts.delete);
router.get('/productEdit/:id', controllersProducts.edit);
router.put('/productEdit', controllersProducts.editConfirm);


module.exports = router;