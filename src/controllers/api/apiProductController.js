const db = require("../../database/models");
const sequelize = db.sequelize;

const productsApiController = {

    list: async (req, res) => {
        const productos = await db.Producto.findAll({Attributes: ['idcategoria'], group: ['idcategoria']},{where:{estado:1}})
        db.Producto.findAll({
            where: {
                estado:1,
            }
        })
            .then((products) => {
                let respuesta = {
                    count: {
                        status: 200,
                        total: products.length,
                        totalCategorias: productos.length,
                        url: "/api/products",
                    },
                    data: products.map((product) => {
                        return {
                            id: product.id,
                            category: product.idcategoria,
                            name: product.nombre,
                            description: product.descripcion,
                            image: "/images/products/" + product.img,
                            price: product.precio,
                            detail: "/api/products/" + product.id,
                        };
                    }),
                };
                res.json(respuesta);
            })

            .catch(function (error) {
                res.json({ status: 800 });
            });
    },

    detail: (req, res) => {
        db.Producto.findByPk(req.params.id)
            .then((products) => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: "/api/products/" + products.id,
                    },
                    data: {
                        id: products.id,
                        name: products.nombre,
                        category: products.idcategoria,
                        description: products.descripcion,
                        image: "/images/products/" + products.img,
                        price: products.precio,
                    },
                };

                res.json(respuesta);
            })

            .catch(function (error) {
                res.json({ status: 800 });
            });
    },
};

module.exports = productsApiController;
