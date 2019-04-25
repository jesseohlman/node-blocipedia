const Collaborator = require("../db/models").Collaborator;
const User = require("../db/models").User;
const CollabUsers = require("../db/models").collabUsers;


module.exports = {

    addUser(email, callback){
        User.findOne({where: {email: email}})
        .then((user) => {
            
        })
    },

    findCollab(wikiId, callback){

        Collaborator.findOne({
            include: {
                model: User,
                as: "users",
                through: { attributes: []}
            },
            where: {wikiId: wikiId}})
        .then((collab) => {
            callback(null, collab);
        })
        .catch((err) => {
            callback(err);
        })
    },

    newCollab(req, callback){

        User.findOne({where: {email: req.body.email}})
        .then((user) => {
            if(user){
                Collaborator.findOne({where: {wikiId: req.params.wikiId}})
                .then((collab) => {

                    console.log(`\n found collad: ${collab.wikiId}\n`);
                    CollabUsers.create({
                        userId: user.id,
                        collaboratorId: collab.id
                    }).then((res) => {
                        callback(null, user);
                    })
                    .catch((err) => {
                        callback(err);
                    })
                })
            } else {
                req.flash("notice", "We could not find a user with that email.");
                callback("No user found");
        }
        })
    }
}