const path = require('path');
const fs = require('fs');
const jsonPath = path.join(__dirname,'../database/users.json');

const json = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

const allUsers = json.map(e => {
    return {
      id: e.id,
      name: e.name,
      lastName: e.lastName,
      email: e.email,
      password: e.password,
      img: e.img,

    }
  }) 

const controller = {
    allUsers: (req,res) => {
        res.render(path.join(__dirname,'../views/users'),{'allUsers':allUsers});
    },

    postUser: (req,res) =>{
        const newName = req.body.name;
        const newlastName = req.body.lastName;
        const newEmail = req.body.email;
        const newPassword = req.body.password;
        const newImg = req.file ? req.file.filename : "userDefault.png";

        const id = allUsers[allUsers.length - 1].id;
        const newId = id + 1;

        const obj = {
            id: newId,
            name: newName,
            lastName: newlastName,
            email: newEmail,
            password: newPassword,
            img: newImg,
        }

        allUsers.push(obj);
        
        fs.writeFile(jsonPath,JSON.stringify(allUsers),(error) => {
            if(error){
                res.send(error);
            }else{
                res.redirect('/perfil/'+ newId );
            }
        })
    },

    getUserId: (req,res) => {
      const id = req.params.id;
      const user = allUsers.find((element) => element.id == parseInt(id));
      if(user){
          res.render(path.join(__dirname,'../views/userDetail'),{'user':user})
      }else{
          res.send("Not found");
      }
  },

    edit: (req,res)=>{
      const id = req.params.id;
      const userEdit=allUsers.find((element) => element.id === parseInt(id));
      res.render(path.join(__dirname,'../views/useredit'),{'userEdit':userEdit});
  },

  editConfirm: (req,res) => {
    const newId = req.body.id;
    const newName = req.body.name;
    const newlastName = req.body.lastName;
    const newEmail = req.body.email;
    const newPassword = req.body.password;

    allUsers.forEach((element) => {
        if(element.id === parseInt(newId)){
            element.id = parseInt(newId);
            element.name = newName;
            element.lastName = newlastName;
            element.email = newEmail;
            element.password = newPassword;
        }
    });

    fs.writeFile(jsonPath,JSON.stringify(allUsers),(error) => {
        if(error){
            res.send(error);
        }else{
            res.redirect('/users');
        }
    })
  },
  delete: (req,res)=>{
    const id = req.params.id;
    const users = allUsers.filter(e => e.id != parseInt(id));

    fs.writeFile(jsonPath,JSON.stringify(users), (error)=>{
        if(error){
            res.send("Error " + error);
        }else{
            res.redirect('/users');
        }
    });
  },

  perfil: (req,res)=>{
    const id = req.params.id;
    const perfil=allUsers.find((element) => element.id === parseInt(id));
    res.render(path.join(__dirname,'../views/perfil'),{'perfil':perfil});
},

editConfirm: (req,res) => {
  const newId = req.body.id;
  const newName = req.body.name;
  const newlastName = req.body.lastName;
  const newEmail = req.body.email;
  const newPassword = req.body.password;

  allUsers.forEach((element) => {
      if(element.id === parseInt(newId)){
          element.id = parseInt(newId);
          element.name = newName;
          element.lastName = newlastName;
          element.email = newEmail;
          element.password = newPassword;
      }
  });

  fs.writeFile(jsonPath,JSON.stringify(allUsers),(error) => {
      if(error){
          res.send(error);
      }else{
          res.redirect('/home');
      }
  })
 },
};


module.exports = controller;