const path = require('path');
const fs = require('fs');
//const { all } = require('../routes/products');
const jsonPath = path.join(__dirname,'../database/products.json');

const json = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

const allProducts = json.map(e => {
    return {
      id: e.id,
      nombre: e.nombre,
      descripcion: e.descripcion,
      precio: e.precio,
      img: e.img,
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
      const newImg = req.file ? req.file.filename : "";
      const newStock = req.body.stock;

      const id = allProducts[allProducts.length - 1].id;
      const newId = id + 1;

      const obj = {
          id: newId,
          nombre: newName,
          descripcion: newDetail,
          precio: newPrice,
          img: newImg,
          descuento: newOffert,
          stock: newStock,
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

  search: (req, res) => {
    const id = req.query.id;
    const product = allProducts.filter((element) => element.id == parseInt(id));
    if(product){
        res.render(path.join(__dirname,'../views/adminProductDetail'),{'product':product})
    }else{
        res.send("Not Found");
    }
  },

  delete: (req,res)=>{
    const id = req.params.id;
    const product = allProducts.filter(e => e.id != parseInt(id));

    fs.writeFile(jsonPath,JSON.stringify(product), (error)=>{
        if(error){
            res.send("Error " + error);
        }else{
            res.redirect('/adminProducts');
        }
    });
  },

  edit: (req,res)=>{
    const id = req.params.id;
    const productEdit=allProducts.find((element) => element.id === parseInt(id));
    res.render(path.join(__dirname,'../views/productEdit'),{'productEdit':productEdit});
  },

  editConfirm: (req,res) => {
    const newId = req.body.id;
    const newName = req.body.nombre;
    const newDetail = req.body.descripcion;
    const newPrice = req.body.precio;
    const newOffert = req.body.descuento;

    allProducts.forEach((element) => {
        if(element.id === parseInt(newId)){
            element.id = parseInt(newId);
            element.nombre = newName;
            element.descripcion = newDetail;
            element.precio = newPrice;
            element.descuento = newOffert;
        }
    });

    fs.writeFile(jsonPath,JSON.stringify(allProducts),(error) => {
        if(error){
            res.send(error);
        }else{
            res.redirect('/adminListarProducts');
        }
    })
  },

}


module.exports = controller2;