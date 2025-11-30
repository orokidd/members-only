const db = require("../models/queries")
const passport = require("passport")
const bcrypt = require("bcryptjs")

const controller = {
    getSignIn: (req, res) => {
        if (req.isAuthenticated()) {
            return res.redirect("/")
        }
        res.render("./sign-in/sign-in")
    },

    postSignIn: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err);
        
            if (!user) {
                return res.render('./sign-in/sign-in', { 
                    error: info?.message,
                });
            }

            req.logIn(user, (err) => {
                if (err) return next(err);
                return res.redirect('/');
            });
        })(req, res, next);
    },

    getSignUp: (req, res) => {
        if (req.isAuthenticated()) {
            return res.redirect("/")
        }
        res.render("./sign-up/sign-up")
    },

    postSignUp: async (req, res) => {
        try {
            const password = req.body.password;
            const passwordConfirmation = req.body.repeat_password;

            const usernameExist = await db.checkUsernameExists(req.body.username)
            if (usernameExist) {
                return res.render("./sign-up/sign-up", { error: "Username already taken"})
            }

            if (password !== passwordConfirmation) {
                return res.render("./sign-up/sign-up", { error: "Password doesn't match"} )
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newUserData = { fullname: req.body.fullname, username: req.body.username, password_hash: hashedPassword}

            await db.newUser(newUserData)
            res.redirect("/")
        } catch(err) {
            console.log(err)
            res.status(500).render("./sign-up/sign-up", {
                error: "Registration failed. Please try again."
            })
        }
    },

    logout: (req, res) => {
        req.logout((err) => {
            if (err) {
                console.log("Logout error:", err)
                return res.status(500).send("Logout Failed");
            }
            res.redirect("/")
        })
    }
}

module.exports = controller;