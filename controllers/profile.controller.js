const db = require("../models/queries")

const controller = {
    getProfile: async (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect("/sign-in")
        }

        // const userId = req.params.userId
        const userId = req.user.id

        try {
            const userPosts = await db.getUserPosts(userId)
            res.render("./profile/profile", { user: req.user, posts: userPosts })
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = controller