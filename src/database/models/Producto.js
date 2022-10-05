module.exports = (sequelize, dataTypes) => {
    let alias = 'Producto';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        precio: {
            type: dataTypes.DECIMAL(6,2)
        },
        stock: {
            type: dataTypes.INTEGER
        },
        descripcion: {
            type: dataTypes.TEXT('long')
        },
        descuento: {
            type: dataTypes.BOOLEAN
        },
        img: {
            type: dataTypes.STRING
        },
        idcategoria: {
            type: dataTypes.STRING
        },
        estado: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'productos',
        timestamps: false
    };
    const Producto = sequelize.define(alias, cols, config)

    return Producto
}