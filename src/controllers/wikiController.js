const wikiQueries = require("../db/wiki.queries");

module.exports = {
    index(req, res, next){
        console.log("index query log");
        wikiQueries.getAllWikis((err, wikis) => {
            if(err || !wikis){
                res.redirect(404, "/");
            }else{
                res.render("wikis/index", {wikis});
            }
        })
        
    },

    new(req, res, next){
        console.log("new query log");
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
        console.log("show query log");

        wikiQueries.getWiki(req.params.id, (err, wiki) => {
            if(!wiki || err){
                res.redirect(404, "/");
            } else {
                res.render("wikis/show", {wiki});

            }
        })
        
    

    },

    edit(req, res, next){
        console.log("edit query log");

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
        wikiQueries.update(req, (err, wiki) => {
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