const Authorizer = require("../policies/wiki");
const collaboratorQueries = require("../db/collaborators.queries");
const User = require("../db/models").User;
const Wiki = require("../db/models").Wiki;



module.exports = {

    showCollabs(req, res, next){

            collaboratorQueries.findCollabs(req.params.wikiId, (err, collabs) => {
                if(err){
                    req.flash("error", err);
                    res.redirect(`/wikis/${req.params.wikiId}/edit`);
                } else {
                    if(collabs.length >= 1){
                    const userIds = collabs.map((collab) => {return collab.userId});
                    User.findAll({where: {id: userIds}})
                    .then((users) => {
                        Wiki.findOne({where: {id: req.params.wikiId}})
                        .then((wiki) => {
                            res.render("collaborators/show", {users, wiki});
                        })
                    })
                } else {
                    req.flash("notice", "There are no collaborators for this project");
                    res.redirect(`/wikis/${req.params.wikiId}/edit`);
                }
                }
            })
    },

    create(req, res, next){
        collaboratorQueries.newCollab(req, (err, user) => {
            if(err){
                req.flash("error", err);
                res.redirect(`/wikis/${req.params.wikiId}/edit`);
            } else {
                req.flash("notice", "You have succesfully added a new collaborator for this wiki!");
                res.redirect(`/wikis/${req.params.wikiId}/collaborators`);
            }
        })
    },

    destroy(req, res, next){
        collaboratorQueries.deleteCollab(req, (err, collab) => {
            if(err){
                req.flash("error", err);
                res.redirect(`/wikis/${req.params.wikiId}/collaborators`);
            } else {
                res.redirect(`/wikis/${req.params.wikiId}/collaborators`);
            }
        })
    }

}