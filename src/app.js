const express = require("express");
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require("path");
const session = require('express-session');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const db = require('./database/models');

const routerMain = require('./routes/main');
const usuariosRoutes = require('./routes/usuariosRoutes');
const peliculasRoutes = require("./routes/peliculasRoutes");

const app = express();

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'contrasenia', 
    },
    async (email, contrasenia, done) => {
        try {

            const usuario = await db.Usuario.findOne({ where: { email: email } });

            if (!usuario) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }

            const passwordMatch = await bcrypt.compare(contrasenia, usuario.contrasenia);

            if (!passwordMatch) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }

            return done(null, usuario);
        } catch (error) {
            return done(error);
        }
    }
));

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'clave',
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const usuario = await db.Usuario.findByPk(payload.id);

        if (!usuario) {
            return done(null, false);
        }

        return done(null, usuario);
    } catch (error) {
        return done(error);
    }
}));

app.set('view engine','ejs');

app.use(session({secret: 'secret'}));
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
app.use(usuariosRoutes);
app.use(peliculasRoutes);

//Routes de Api
const peliculasApiRouter = require('./routes/api/peliculasApiRoute');
const usersApiRouter = require('./routes/api/userApiRoute');

// const requireAuth = passport.authenticate('jwt', { session: false });

//Endpoints de Apis
app.use('/api/peliculas',peliculasApiRouter);
app.use('/api/users',usersApiRouter);

app.use((req,res) =>{
    res.status(404).render('not-found')
});

app.listen(3030, () => console.log("Trabajando en puerto 3030"));
