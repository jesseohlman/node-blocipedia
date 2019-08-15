require("dotenv").config();
const logger = require('morgan');
const bodyParser = require("body-parser");
const path = require("path");
const expressValidator = require("express-validator");
const viewsFolder = path.join(__dirname, "..", "views");
const session = require("express-session");
const flash = require("express-flash");
const passportConfig = require("./passport");


module.exports = {
    init(app, express){

        app.use(logger('dev'));
        app.use(expressValidator());
        app.use(bodyParser.urlencoded({extended: true }));
        app.use(express.json());
        app.set("views", viewsFolder);
        app.set("view engine", "ejs");
        app.use(express.static(path.join(__dirname, "..", "assets")));
        app.use(session({
            secret: process.env.cookieSecret,
            resave: false,
            saveUninitialized: false,
            cookie: {maxAge: 1.21e+9}
        }));
        passportConfig.init(app);
        app.use(flash());
        app.use((req, res, next) => {
            res.locals.currentUser = req.user;       
            next();
        })
    }
}