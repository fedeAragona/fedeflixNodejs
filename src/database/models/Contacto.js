module.exports = (sequelize, dataTypes) => {
    let alias = 'Contacto';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        asunto: {
            type: dataTypes.STRING
        },
        consulta: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'contacto',
        timestamps: false
    };
    const Contacto = sequelize.define(alias, cols, config)

    return Contacto
}