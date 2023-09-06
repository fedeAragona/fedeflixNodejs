const db = require("../../database/models");

const peliculasApiController = {

    list: async (req, res) => {
        db.Pelicula.findAll({
            where: {
                estado:1,
            }
        })
            .then((peliculas) => {
                let respuesta = {
                    count: {
                        status: 200,
                        total: peliculas.length,
                        url: "/api/peliculas",
                    },
                    data: peliculas.map((peli) => {
                        if(peli.img.startsWith("http")){
                            return {
                                id: peli.id,
                                name: peli.nombre,
                                description: peli.descripcion,
                                duracion: peli.duracion,
                                genero: peli.genero,
                                estado: peli.estado,
                                image: peli.img,
                                detail: "/api/peliculas/" + peli.id,
                            };
                        }else{
                            return {
                                id: peli.id,
                                name: peli.nombre,
                                description: peli.descripcion,
                                duracion: peli.duracion,
                                genero: peli.genero,
                                estado: peli.estado,
                                image: "/images/peliculas/" + peli.img,
                                detail: "/api/peliculas/" + peli.id,
                            };
                        }
                    }), 
                };
                res.json(respuesta);
            })

            .catch(function (error) {
                res.json({ status: 800 });
            });
    },

    detail: (req, res) => {
        db.Pelicula.findByPk(req.params.id)
            .then((pelicula) => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: "/api/peliculas/" + pelicula.id,
                    },
                    data: {
                        id: pelicula.id,
                        name: pelicula.nombre,
                        description: pelicula.descripcion,
                        duracion: pelicula.duracion,
                        genero: pelicula.genero,
                        estado: pelicula.estado,
                        detail: "/api/peliculas/" + pelicula.id,
                    },
                };

                res.json(respuesta);
            })
            .catch(function (error) {
                res.json({ status: 800 });
            });
    },
};

module.exports = peliculasApiController;
