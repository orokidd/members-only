const db = require("../models/queries")

const controller = {
    getNewPost: (req, res) => {
        if (!req.isAuthenticated()) {
            return res.redirect("/sign-in")
        }
        res.render("./post/post", { user: req.user })
    },

    postNewPost: async (req, res) => {
        const { title, content } = req.body
        const newPostData = { title, content, userId: req.user.id }

        if (title.trim() === '' || content.trim() === ''){
            return res.render("./post/post", { user: req.user, error: "Title or content can't be empty" })
        }

        if (title.length > 200) {
            return res.render("./post/post", { user: req.user, error: "Title too long (max 200 characters)" })
        }

        try {
            await db.newPost(newPostData)
            res.redirect("/")
        } catch (err) {
            console.log(err)
            res.status(500).send("error")
        }
    },

    deletePost: async (req, res) => {
        const postId = req.params.postId

        try {
            await db.deletePost(postId)
            res.redirect("/")
        } catch (err) {
            console.log(err)
            res.status(500).send("error deleting post")
        }
    }
}

module.exports = controller;