const db = require('../../database/models');
const sequelize = db.sequelize;

const usersApiController = {
    list: (req, res) => {
        db.Usuario.findAll({
            where:{
                estado:1,
            }
        })
            .then(users => {
                let respuesta = {
                    count: {
                        status: 200,
                        total: users.length,
                        url: "/api/users"
                    },
                    users: users.map(user => {
                        return {
                            id: user.id,
                            name: user.nombre,
                            email: user.email,
                            avatar: "/images/users/" + user.img,
                            isAdmin: user.admin,
                            detail: "/api/users/" + user.id
                        }
                    })
                }
                res.json(respuesta)
            })
    },

    detail: (req, res) => {
        db.Usuario.findByPk(req.params.id)
            .then(user => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: user.id.length,
                        url: "/api/users/" + user.id
                    },
                    data: {
                        id: user.id,
                        name: user.nombre,
                        email: user.email,
                        avatar: "/images/users/" + user.img,
                    }
                }
                res.json(respuesta)
            })
    }

}

module.exports = usersApiController;