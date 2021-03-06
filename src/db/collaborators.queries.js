const Collaborator = require("../db/models").Collaborator;
const User = require("../db/models").User;


module.exports = {

    addUser(email, callback){
        User.findOne({where: {email: email}})
        .then((user) => {
            
        })
    },

    findCollabs(wikiId, callback){

        Collaborator.findAll({where: {wikiId: wikiId}})
        .then((collabs) => {

            callback(null, collabs);
        })
        .catch((err) => {
            callback(err);
        })
    },

    newCollab(req, callback){
        User.findOne({where: {email: req.body.email}})
        .then((user) => {
            if(user){
                Collaborator.findOne({where: {wikiId: req.params.wikiId, userId: user.id}})
                .then((collab) => {
                    if(collab){
                        req.flash("notice", "This user is already a collaborator of this wiki.");
                        callback("No repeats")
                    } else {
                        Collaborator.create({
                            userId: user.id,
                            wikiId: req.params.wikiId
                        }).then((collab) => {
                            callback(null, collab);
                        })
                        .catch((err) => {
                            callback(err);
                        })
                    }  
                })
            } else {
                req.flash("notice", "We could not find a user with that email.");
                callback("No user found");
            }
        })
    },

    deleteCollab(req, callback){
        Collaborator.destroy({where: {wikiId: req.params.wikiId, userId: req.body.id}})
        .then((collab) => {
            callback(null, collab);
        })
        .catch((err) => {
            callback(err);
        })
    }
}