const express = require("express")
const router = express.Router()
const indexController = require("../controllers/index.controller")

router.use("/", indexController.getIndex)

module.exports = router;
