const path = require('path');
const fs = require('fs');
const { all } = require('../routes/users');
const jsonPath = path.join(__dirname,'../database/users.json');

const json = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

const allUsers = json.map(e => {
    return {
      id: e.id,
      name: e.name,
      email: e.email,
      password: e.password
    }
  }) 

const controller = {
    allUsers: (req,res) => {
        res.render(path.join(__dirname,'../views/users'),{'allUsers':allUsers});
    }
};


module.exports = controller;