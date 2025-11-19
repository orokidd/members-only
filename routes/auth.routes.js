const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/sign-up", authController.getRegister);

router.post("/sign-up", authController.postRegister);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/log-out", authController.logout);

module.exports = router;
