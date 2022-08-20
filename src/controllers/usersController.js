const db = require('../database/models');
const path = require('path');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Usuario = db.Usuario;

const usersController = {
    'list': (req, res) => {
        db.Usuario.findAll()
            .then(usuarios => {
                res.render('users2.ejs', {usuarios})
            })
    },
    'detail': async (req, res) => {
        try{
            const usuarios = await db.Usuario.findByPk(req.params.id)
            res.render('userEdit2.ejs', {usuarios});
        } 
        catch (error){
            console.log(error);
        }
    },

    postUser: async (req, res) => {

        const newUser = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contraseña: req.body.contraseña,
            img: req.file ? req.file.filename : "userDefault.png",
            estado: 1
        }

        try{
            await db.Usuario.create(newUser);
            const user = await db.Usuario.findOne({
                where:{
                    email: req.body.email
                }
            });
            res.redirect('/perfil/' + user.id);
        }
        catch(error){
            console.log(error);
        }
    },

    perfil: async (req,res)=>{
        try{
            const perfil = await db.Usuario.findByPk(req.params.id)
            res.render(path.join(__dirname,'../views/perfil'),{perfil});
        }
        catch(error){
            console.log(error);
        }
    },

    update: async (req,res) => {
        const {
            nombre,
            apellido,
            email,
            contraseña,
            img,
        } = req.body;
    
        try {
            await db.Usuario.update(
                {
                    nombre,
                    apellido,
                    email,
                    contraseña,
                    img,
                    estado:1
                },
                {
                    where: {
                        id: req.body.id,
                    }
                }
            );
            res.redirect('/users2');
        } catch (error) {
            console.log(error);
        }
    },

    delete: async (req,res) => {
        try {
            await db.Usuario.update(
                {
                    estado:0
                },
                {
                    where: {
                        id: req.params.id,
                    }
                }
            );
            res.redirect('/users2');
        } catch (error) {
            console.log(error);
        }
    },
}

module.exports = usersController;