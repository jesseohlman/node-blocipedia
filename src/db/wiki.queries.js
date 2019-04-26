const Wiki = require("../db/models").Wiki;
const Collaborator = require("../db/models").Collaborator;
const User = require("../db/models").User;
const Authorizer = require("../policies/wiki");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const collabQueries = require("./collaborators.queries");
const markdown = require("markdown").markdown;
const helpers = require("../auth/helpers");




module.exports = {
    createWiki(req, callback){
        const authorized = new Authorizer(req.user).create();
        if(authorized){

            Wiki.create({
                title: req.body.title,
                body: req.body.body,
                userId: req.user.id,
                private: req.body.private
            })
            .then((wiki) => {

                if(wiki){
                    if(wiki.private === true){
                        Collaborator.create({
                            wikiId: wiki.id
                        }).then((res) => {
                            callback(null, wiki);
                        })
                        .catch((err) => {
                            callback(err);
                        })
                    } else {
                        callback(null, wiki);
                    }
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

    getPublicWikis(user, callback){

        Wiki.findAll({where: {[Op.not]:{private: true}}})
        .then((wikis) => {
            if(user){
                Collaborator.findAll({where: {userId: user.id}})
                .then((collabs) => {
                   var wikiIds = collabs.map((collab) => {return collab.wikiId});
                   Wiki.findAll({where: {id: wikiIds}})
                   .then((collabWikis) => {
                       const refinedWikis = collabWikis.concat(wikis);
                       callback(null, refinedWikis)
                   })
                })
            } else {
                callback(null, wikis);
            }
        })
        .catch((err) => {
            callback(err);
        })
    },

    getUserPremiumWikis(user, callback){

        Wiki.findAll({
            where: {[Op.or]: [{private: true, userId: user.id}, {[Op.not]:{private: true}}]}})
            .then((wikis) => {
                console.log("\n wikis got \n");
                Collaborator.findAll({where: {userId: user.id}})
                .then((collabs) => {
                    console.log("\n collabs got \n");

                    if(collabs){
                  /* var wikiIds = collabs.map((collab) => {return collab.wikiId});
                   console.log(`\n\n${wikiIds[0]}\n`);
                   Wiki.findAll({where: {id: wikiIds}})
                   .then((collabWikis) => {
                       const refinedWikis = collabWikis.concat(wikis);
                       callback(null, refinedWikis)

                   })*/
                   callback(null, wikis);
                    }else{
                        callback(null, wikis)
                }
                })
            })
            .catch((err) => {
                console.log(err);
                callback(err);
            })
    },

    getWiki( req, callback){

        Wiki.findOne({
            where: {id: req.params.id}
        })
        .then((wiki) => {
            if(wiki.private){
                const authorized = new Authorizer(req.user, wiki)._isPremium();
                if(authorized){
                    callback(null, wiki)
                } else {
                    req.flash("notice", "You are not authorized to do that.");
                    callback("Forbidden");
                }
            } else {
            callback(null, wiki)
            }
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
                    body: req.body.body,
                    private: req.body.private
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
    },

    
    convertPrivates(req, callback){
        Wiki.findAll({where: {userId: req.user.id}})
        .then((wikis) => {
            var wikiArr = wikis.map((wiki) => {
                wiki.update({private: false})
            })
            callback(null, wikiArr);
        })
        .catch((err) => {
            callback(err);
    })
    }
}