const logger = require('morgan');
const bodyParser = require("body-parser");
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const flash = require("express-flash");


module.exports = {
    init(app, express){
        app.use(logger('dev'));
        app.use(bodyParser.urlencoded({extended: true }));
        app.set("views", viewsFolder);
        app.set("view engine", "ejs");
        app.use(express.static(path.join(__dirname, "..", "assets")));
        app.use(flash());
        app.use((req, res, next) => {
            res.locals.currentUser = req.user;       
            next();
        })
    }
}