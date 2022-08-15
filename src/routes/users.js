const express = require("express");
const controllersUser = require("../controllers/controllersUser");
const multer = require('multer');
const path = require('path');


const router = express.Router();

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


//router.get("/users", controllersUser.allUsers);


//router.get('/edit/:id', controllersUser.edit);
router.put('/edit', controllersUser.editConfirm);
router.delete('/delete/:id',controllersUser.delete);
//router.post('/user',upload.single('img'),controllersUser.postUser);
//router.get('/perfil/:id', controllersUser.perfil);
module.exports = router;