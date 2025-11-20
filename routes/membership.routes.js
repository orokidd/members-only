const express = require("express");
const router = express.Router();
const memberController = require("../controllers/member.controller");

router.get("/member", memberController.getMember);
router.post("/member", memberController.postMember);

module.exports = router;
