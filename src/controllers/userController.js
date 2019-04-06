const userQueries = require("../db/users.queries.js");
const sgMail = require('@sendgrid/mail');
const User = require("../db/models").User;

module.exports = {
    create(req, res, next){
        User.findOne({
            where: { email: req.body.email }
        }) //checks if there is already a user with the req email
        .then((user) => {
            if(user){
                req.flash("notice", "that email is already in use");
                res.redirect("users/signup");
            }else{

                userQueries.createUser(req, (err, user) => {
                    if(err){
                        req.flash("error", err);
                        res.redirect("users/signup");
                    } else {
                        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                        const msg = { //sends conf email
                            to: req.body.email,
                            from: 'ohlmanjesse@gmail.com',
                            subject: 'Verification email',
                            text: 'Please verify that you made an acoount with blocipedia',
                            html: '<strong>Verify and join the fun</strong>',
                        };
                        sgMail.send(msg)
                        req.flash("notice", "You've made an account!");
                        res.redirect("/");
                    }
                })
            }
        })
    },

    signup(req, res, next){
        res.render("users/signup");
    }
}