const Wiki = require("../db/models").Wiki;

module.exports = {
    createWiki(req, callback){
        Wiki.create({
            title: req.body.title,
            body: req.body.description,
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
    }
}