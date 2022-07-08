const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");

const app = express();

const path = require("path");

//const methodOverride= require("method-override");

app.listen(3030, () => console.log("Trabajando en puerto 3030"));

app.set('view engine','ejs');
//app.use(morgan("dev"));
//app.use(methodOverride("_method"));

//para que pueda escribir en json con un post 
//app.use(express.urlencoded({extended:false}));
//app.use(express.json());

app.use(express.static(path.join(__dirname,'../public')));

const routerMain = require('./routes/main');
const routerUsers = require('./routes/user');

app.use(routerMain);
app.use(routerUsers)

app.use(methodOverride("_method"));