const express = require("express");

const app = express();

const path = require("path");

const methodOverride= require("method-override");

app.listen(3030, () => console.log("Trabajando en puerto 3030"));

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'../public')));

const routerMain = require('./routes/main');

app.use(routerMain);

app.use(methodOverride("_method"));