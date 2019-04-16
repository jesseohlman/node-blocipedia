const userQueries = require("../db/users.queries.js");
const sgMail = require('@sendgrid/mail');
const User = require("../db/models").User;
const passport = require("passport");
var stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");



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
                        passport.authenticate("local")(req, res, () => {
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
                        });
                    }
                })
            }
        })
    },

    signup(req, res, next){
        res.render("users/signup");
    },

    signinForm(req, res, next){
        res.render("users/signin");
    },

    signin(req, res, next){

        passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/signin', failureFlash: true })(req, res);
        /*passport.authenticate('local')(req, res, function(){
            if(req.user){
                req.flash("notice", "You have successfully signed in!");
                res.redirect("/");
            } else {
                req.flash("notice", "You've failed to signed in, please try again.");
                res.redirect(req.headers.referer);
            }
        });*/
    },

    signout(req, res, next){
        req.logout();
        req.flash("notice", "You've successfully signed out!");
        res.redirect("/");
    },

    premium(req, res, next){
        if(req.user){
            res.render("users/upgrade");
        }else {
            req.flash("error", "you must be signed in to upgrade your account");
            res.redirect("/users/signin");
        }
    },

    upgrade(req, res, next){

        const token = req.body.stripeToken;
        const chargeAmount = req.body.chargeAmount;
        

        const charge = stripe.charges.create({
            amount: chargeAmount,
            currency: 'usd',
            description: 'Upgrade to premium',
            source: token,
        }, function(err, charge) {
            if(err && err.type === "StripeCardError"){
                req.flash("error", "You're card has been declined.");
            } else {
                User.findOne({where: {id: req.user.id}})
                .then((user) => {
                    user.update({
                        role: "premium"
                    }).then((user) => {
                        req.flash("notice", "You are now a premium member!");                        
                    })
                })
            }
        });
        res.redirect("/");
        
        
    },

    downgrade(req, res, next){
        User.findOne({where: {id: req.user.id}})
        .then((user) => {
            user.update({
                role: "member"
            }).then((user) => {
                if(user.role = "member"){
                    req.flash("notice", "You have downgraded to a member");
                    res.redirect("/");
                } else {
                    req.flsh("error", "Something went wrong");
                    res.redirect("/");
                }
            });
        });
    },

    member(req, res, next){
        if(req.user.role == "premium"){
            res.render("users/downgrade");
        } else {
            req.flash("error", "You cannot downgrade your account if you aren't a premium member.");
            res.redirect("/");
        }
    } 

}