const controller = {
    getIndex: (req, res) => {
        res.render("index", { user: req.user })
    }
}

module.exports = controller;