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
    },

    getEditPost: async (req, res) => {
        const postId = req.params.postId

        try {
            const selectedPost = await db.getPostById(postId)

            if ( req.user.id !== selectedPost.user_id) {
                return res.redirect("/")
            }

            res.render("./edit/edit", { user:req.user, post:selectedPost })
        } catch (err) {
            console.log(err)
            res.status(500).send("error fetching post")
        }
    },

    postEditPost: async (req, res) => {
        const postId = req.params.postId
        const { post_title, post_content } = req.body
        const newPostData = { title: post_title, content: post_content }

        try {
            await db.editPost(postId, newPostData)
            res.redirect("/profile")
            
        } catch (err) {
            console.log(err)
            res.status(500).send("edit post failed")
        }
    }
}

module.exports = controller;