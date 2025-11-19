const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/sign-up", authController.getSignUp);

router.post("/sign-up", authController.postSignUp);

router.get("/sign-in", authController.getSignIn);

router.post("/sign-in", authController.postSignIn);

router.get("/log-out", authController.logout);

module.exports = router;
