const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'../../public/images/users'));
    },
    filename: (req, file, cb)=>{
        const newFile = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null,newFile);
    }
});

const upload = multer({ storage });

router.get('/users2', usersController.list);
router.get('/edit/:id', usersController.detail);
router.post('/user',upload.single('img'),usersController.postUser);
router.get('/perfil/:id', usersController.perfil);
router.put('/edit', usersController.update);
router.delete('/delete/:id', usersController.delete);
router.post('/login', usersController.processLogin);
module.exports = router;