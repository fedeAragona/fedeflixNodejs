const path = require('path');

const controller = {
    adminUsers: (req,res) => {
        res.render(path.join(__dirname,'../views/adminUsers'));
    }
};


module.exports = controller;