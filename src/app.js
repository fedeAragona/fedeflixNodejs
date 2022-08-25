const express = require("express");
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require("path");

const routerMain = require('./routes/main');
const routerUsers = require('./routes/users');
const routerProducts = require('./routes/products');
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();

app.set('view engine','ejs');


app.use(morgan('dev'));
app.use(methodOverride('_method'));
//para que pueda escribir en json con un post 
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'../public')));


// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

app.use(routerMain);
//app.use(routerUsers);
app.use(routerProducts);
app.use(usuariosRoutes);


app.listen(3030, () => console.log("Trabajando en puerto 3030"));
