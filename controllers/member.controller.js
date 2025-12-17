const db = require("../models/queries")

const controller = {
    getMember: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect("/sign-in")
        }
        res.render("./member/member", {user: req.user})
    },

    postMember: async (req, res) => {
        if (!req.user) {
            return res.redirect("/sign-in")
        }
        
        const secretPassword = req.body.secret_password; // From form input
        const currentUserId = req.user.id; // From session

        if (secretPassword !== process.env.MEMBER_PASSCODE) {
            return res.render("./member/member", { user: req.user, error: "Wrong Passcode" })
        }

        try {
            await db.changeMemberStatus(currentUserId, 2)
            res.redirect("/member")
        } catch (err) {
            console.log(err);
            res.render("./member/member", { user: req.user, error: "Failed to update status" })
        }

    }
}

module.exports = controller;