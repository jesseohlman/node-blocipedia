const Authorizer = require("../policies/wiki");
const collaboratorQueries = require("../db/collaborators.queries");
const Wiki = require("../db/models").Wiki;

module.exports = {

    showCollabs(req, res, next){

            collaboratorQueries.findCollab(req.params.wikiId, (err, collab) => {
                if(err){
                    req.flash("error", err);
                    res.redirect("/");
                } else {
                    console.log("partial success");
                    res.render("collaborators/show", {collab});
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
                res.redirect(`/wikis/${req.params.wikiId}/collaborators/show`);
            }
        })
    }

}