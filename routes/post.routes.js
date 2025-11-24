const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

router.get("/post", postController.getNewPost);
router.post("/post", postController.postNewPost);

router.post("/delete/:postId", postController.deletePost)
router.get("/edit/:postId", postController.getEditPost)
router.post("/edit/:postId", postController.postEditPost)

module.exports = router;
