const db = require("../models/queries")
const passport = require("passport")
const pool = require("../models/pool")
const bcrypt = require("bcryptjs")

const controller = {
    getLogin: (req, res) => {
        if (req.isAuthenticated()) {
            return res.redirect("/")
        }
        res.render("login-form")
    },

    postLogin: passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    }),

    getRegister: (req, res) => {
        if (req.isAuthenticated()) {
            return res.redirect("/")
        }
        res.render("sign-up-form")
    },

    postRegister: async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            await pool.query("INSERT INTO users (fullname, username, password_hash) VALUES ($1, $2, $3)", [req.body.fullname, req.body.username, hashedPassword]);
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