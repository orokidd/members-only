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

    postSignIn: passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/sign-in"
    }),

    getSignUp: (req, res) => {
        if (req.isAuthenticated()) {
            return res.redirect("/")
        }
        res.render("./sign-up/sign-up")
    },

    postSignUp: async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newUserData = { fullname: req.body.fullname, username: req.body.username, password_hash: hashedPassword}

            await db.newUser(newUserData)
            res.redirect("/")
        } catch(err) {
            console.log(err)
            res.status(500).render("sign-up-form", {
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