const db = require("../models/queries")

const controller = {
    getIndex: async (req, res) => {
        const allPosts = await db.getAllPosts()
        res.render("index", { user: req.user , posts: allPosts}) // Passport attaches user object to req.user
    }
}

module.exports = controller;