const express = require("express");
const controllersUser = require("../controllers/controllersUser");

const router = express.Router();

router.get("/adminUsers", controllersUser.adminUsers);

module.exports = router;