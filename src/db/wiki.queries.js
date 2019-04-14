const Wiki = require("../db/models").Wiki;
const Authorizer = require("../policies/wiki");


module.exports = {
    createWiki(req, callback){
        const authorized = new Authorizer(req.user).create();
        if(authorized){

            Wiki.create({
                title: req.body.title,
                body: req.body.body,
                userId: req.user.id
            })
            .then((wiki) => {
                if(wiki){
                    callback(null, wiki);
                } 
            })
            .catch((err) => {
                callback(err);
            })
        } else {
            req.flash("notice", "You are not authorized to do that.");
                callback("Forbidden");
        }
    },

    getAllWikis(callback){

        Wiki.findAll()
        .then((wikis) => {
            if(wikis){
                callback(null, wikis)
            }
        })
        .catch((err) => {
            callback(err);
        })
    },

    getWiki(id, callback){

        Wiki.findOne({
            where: {id: id}
        })
        .then((wiki) => {
            callback(null, wiki)
        })
        .catch((err) => {
            callback(err);
        })
    },

    delete(req, callback){
        Wiki.findOne({
            where: {id: req.params.id}
        }).then((wiki) => {
            const authorized = new Authorizer(req.user, wiki).destroy();
            if(authorized){
                wiki.destroy()
                .then((wiki) => {
                    callback(null, wiki);
                })
                .catch((err) => {
                    callback(err);
                })
        } else {
            req.flash("notice", "You are not authorized to do that.");
            callback("Forbidden");
        }
        })
    },

    update(req, callback){

        Wiki.findOne({
            where: {id: req.params.id}
        }).then((wiki) => {
            const authorized = new Authorizer(req.user, wiki).update();
            
            if(authorized){
                wiki.update({
                    title: req.body.title,
                    body: req.body.body
                })
                .then((updatedWiki) => {
                    callback(null, updatedWiki);
                })
                .catch((err) => {
                    callback(err);
                })
            } else {
                req.flash("notice", "You are not authorized to do that.");
                callback("Forbidden");
            }
        })
    }
}