module.exports = (sequelize, dataTypes) => {
    let alias = 'Pelicula';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.DECIMAL(2,1)
        },
        descripcion: {
            type: dataTypes.TEXT('long')
        },
        img: {
            type: dataTypes.STRING
        },
        genero: {
            type: dataTypes.STRING
        },
        estado: {
            type: dataTypes.INTEGER
        },
        duracion: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'peliculas',
        timestamps: false
    };
    const Pelicula = sequelize.define(alias, cols, config)

    return Pelicula
}