const express = require("express");
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require("path");

const routerMain = require('./routes/main');
const routerUsers = require('./routes/users');
const routerProducts = require('./routes/products');

const app = express();

app.set('view engine','ejs');


app.use(morgan('dev'));
app.use(methodOverride('_method'));
//para que pueda escribir en json con un post 
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'../public')));



app.use(routerMain);
app.use(routerUsers);
app.use(routerProducts);


app.listen(3030, () => console.log("Trabajando en puerto 3030"));
