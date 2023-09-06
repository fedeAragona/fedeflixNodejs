module.exports = (sequelize, dataTypes) => {
    let alias = 'UsuariosXPeliculas';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idusuario: {
            type: dataTypes.INTEGER
        },
        idpelicula: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'usuariosxpeliculas',
        timestamps: false
    };
    const UsuariosXPeliculas = sequelize.define(alias, cols, config)

    return UsuariosXPeliculas
}