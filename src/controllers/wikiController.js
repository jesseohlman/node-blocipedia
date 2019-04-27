const wikiQueries = require("../db/wiki.queries");
const Authorizer = require("../policies/wiki");
const helpers = require("../auth/helpers");
const User = require("../db/models").User;
const Collaborator = require("../db/models").Collaborator;


module.exports = {
    index(req, res, next){
        const admin = new Authorizer(req.user)._isAdmin();
        const premium = new Authorizer(req.user)._isPremium();

        if(req.user){
            if(admin){
                wikiQueries.getAllWikis((err, wikis) => {
                    if(err || !wikis){
                        res.redirect(404, "/");
                    }else{
                        res.render("wikis/index", {wikis});
                    }
                })
            } else if(premium){
                console.log("\n loading premium wikis");
                wikiQueries.getUserPremiumWikis(req.user, (err, wikis) => {
                    if(err || !wikis){
                        res.redirect(404, "/");
                    }else{
                        res.render("wikis/index", {wikis});
                    }
                })
            }else{
                wikiQueries.getPublicWikis(req.user, (err, wikis) => {
                    if(err || !wikis){
                        console.log(err);
                        res.redirect(404, "/");
                    }else{
                        res.render("wikis/index", {wikis});
                    }
                })
            }
        } else {
            wikiQueries.getPublicWikis(null, (err, wikis) => {
                if(err || !wikis){
                    res.redirect(404, "/");
                }else{
                    res.render("wikis/index", {wikis});
                }
            })
        }
    },

    new(req, res, next){
        res.render("wikis/new");
    },

    create(req, res, next){
        wikiQueries.createWiki(req, (err, wiki) =>{
            if(err){
                req.flash("error", err);
                res.redirect("/wikis");
            } else {
                req.flash("notice", "you have successfully created a new wkiki!");
                res.redirect("/wikis");
            }
        })
    },

    show(req, res, next){
        var user = {id: 0};

        wikiQueries.getWiki(req, (err, wiki) => {
            if(!wiki || err){
                res.redirect(404, "/");
            } else {
                if(req.user){
                    user = req.user;
                }
                Collaborator.findOne({where: {wikiId: req.params.id, userId: user.id}})
                .then((collab) => {
                    const body = helpers.markdownUpdate(wiki.body);
                    res.render("wikis/show", {wiki, body, collab});
                })
            }
        })
        
    

    },

    edit(req, res, next){

        wikiQueries.getWiki(req, (err, wiki) => {
            if(err){
                req.flash("error", err);
                res.redirect(req.headers.referer);
            } else {
                res.render("wikis/edit", {wiki});
            }
        })
   
    },

    destroy(req, res, next){
        wikiQueries.delete(req, (err, wiki) => {
            if(err){
                req.flash("error", err);
                res.redirect(req.headers.referer);
            } else {
                req.flash("notice", "You have successfully deleted your wiki.");
                res.redirect("/wikis");
            }
        })
    },

    update(req, res, next){
        wikiQueries.update( req, (err, wiki) => {
            if(err){
                req.flash("errors", err);
                res.redirect(req.headers.referer);
            } else {
                req.flash("notice", "You have successfully updated the wiki!");
                res.redirect("/wikis");
            }
        })
    }
}