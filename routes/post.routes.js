const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

router.get("/post", postController.getNewPost);
router.post("/post", postController.postNewPost);

module.exports = router;
