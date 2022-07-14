const express = require("express");
const controllersUser = require("../controllers/controllersUser");

const router = express.Router();

router.get("/users", controllersUser.allUsers);


//router.get('/user/:id', userController.getUserId);
//router.get('/search',userController.search);


//router.post('/user',controllersUser.postUser);
router.get('/edit/:id', controllersUser.edit);
router.put('/edit', controllersUser.editConfirm);
router.delete('/delete/:id',controllersUser.delete);
router.post('/user',controllersUser.postUser);
module.exports = router;