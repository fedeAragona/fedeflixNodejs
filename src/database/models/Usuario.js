module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuario';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        apellido: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        contrasenia: {
            type: dataTypes.STRING
        },
        img: {
            type: dataTypes.STRING
        },
        estado: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'usuarios',
        timestamps: false
    };
    const Usuario = sequelize.define(alias, cols, config)

    return Usuario
}