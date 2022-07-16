const path = require('path');
const fs = require('fs');
const { all } = require('../routes/products');
const jsonPath = path.join(__dirname,'../database/products.json');

const json = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

const allProducts = json.map(e => {
    return {
      id: e.id,
      nombre: e.nombre,
      descripcion: e.descripcion,
      precio: e.precio,
      imagen: e.imagen,
      descuento: e.descuento,
      stock: e.stock
    }
  }) 

const controller2 = {
    allProducts: (req,res) => {
        res.render(path.join(__dirname,'../views/adminListarProducts'),{'allProducts':allProducts});
    },

    postProduct: (req,res) =>{
      const newName = req.body.nombre;
      const newDetail = req.body.descripcion;
      const newPrice = req.body.precio;
      const newOffert = req.body.descuento;

      const id = allProducts[allProducts.length - 1].id;
      const newId = id + 1;

      const obj = {
          id: newId,
          nombre: newName,
          descripcion: newDetail,
          precio: newPrice,
          imagen: "",
          descuento: newOffert,
          stock: 1
      }

      if(obj.descuento != "on"){
        obj.descuento = "off";
      }

      allProducts.push(obj);
      
      fs.writeFile(jsonPath,JSON.stringify(allProducts),(error) => {
          if(error){
              res.send(error);
          }else{
              res.redirect('/home');
          }
      })
  },
}


module.exports = controller2;