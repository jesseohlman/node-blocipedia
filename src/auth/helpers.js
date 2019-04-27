const bcrypt = require("bcryptjs");
const md = require("markdown").markdown;


module.exports = {

    ensureAuthenticated(req, res, next) {
        if (!req.user) {
            req.flash("notice", "You must be signed in to do that.")
            return res.redirect("/users/sign_in");
        } else {
            next();
        }
    },

    comparePass(userPassword, databasePassword) {
        return bcrypt.compareSync(userPassword, databasePassword);
    },

    markdownUpdate(text){
    var text = text;
    var tree = md.parse(text);
    var refs = tree[1].references;

    // iterate through the tree finding link references
( function find_link_refs( jsonml ) {
    if ( jsonml[ 0 ] === "link_ref" ) {
      var ref = jsonml[ 1 ].ref;
   
      // if there's no reference, define a wiki link
      if ( !refs[ ref ] ) {
        refs[ ref ] = {
          href: "http://en.wikipedia.org/wiki/" + ref.replace(/\s+/, "_" )
        };
      }
    }
    else if ( Array.isArray( jsonml[ 1 ] ) ) {
      jsonml[ 1 ].forEach( find_link_refs );
    }
    else if ( Array.isArray( jsonml[ 2 ] ) ) {
      jsonml[ 2 ].forEach( find_link_refs );
    }
  } )( tree );
   
  // convert the tree into html
  var html = md.renderJsonML( md.toHTMLTree( tree ) );
  return html;
  //console.log( html );
    }
}