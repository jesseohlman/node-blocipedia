const wikiQueries = require("../db/wiki.queries");

module.exports = {
    index(req, res, next){
        wikiQueries.getAllWikis((err, wikis) => {
            if(err || !wikis){
                res.redirect(404, "/");
            }else{
                res.render("wikis/index", {wikis});
            }
        })
        
    },

    neww(req, res, next){
        console.log("what");
        res.render("wikis/new");
    },

    create(req, res, next){
        wikiQueries.newWiki(req, (err, wiki) =>{
            if(err){
                req.flash("error", err);
                res.redirect("wikis");
            } else {
                req.flash("notice", "you have successfully created a new wkiki!");
                res.redirect("wikis/index");
            }
        })
    },

    show(req, res, next){
        wikiQueries.getWiki(req.params.id, (err, wiki) => {
            if(!wiki || err){
                res.redirect(404, "/");
            } else {
                res.render("wikis/show", {wiki});

            }
        })
        
    

    },

    delete(req, res, next){

    },

    update(req, res, next){

    }
}