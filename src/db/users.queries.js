const User = require("../db/models").User;
const Collaborator = require("../db/models").Collaborator;
const bcrypt = require("bcryptjs");

module.exports = {
    createUser(req, callback){
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(req.body.password, salt); 

           User.create({
              name: req.body.name,
              email: req.body.email,
               password: hashedPassword
          }).then((user) => {
                    callback(null, user);
           }).catch((err) => {
              callback(err);
          })

    },

    
}