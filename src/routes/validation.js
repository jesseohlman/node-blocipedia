

module.exports = {
    userValidation(req, res, next){
       

        if(req.method === "POST"){
            req.checkBody("name", "must be at least 2 charcters in length").isLength({min: 2});
            req.checkBody("password", "must be at least 6 charcters in length").isLength({min: 6});
            req.checkBody("password_conf", "must match the password").optional().matches(req.body.password);
            req.checkBody("email", "must be a valid email").isEmail();
        }

        const errors = req.validationErrors();
        if(errors) {
            req.flash("error", errors);
            return res.redirect(req.headers.referer);
        } else {
            return next();
        }
    }

}