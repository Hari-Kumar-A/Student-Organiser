const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogsController");

// Viewing all Blogs
router.get("/", blogsController.blogspage);

// Adding blogs
router.get("/addblog", blogsController.addblog);
router.post("/addblog", blogsController.postblog);

// Showing my blogs
router.get("/myblogs", blogsController.myblogs);

// View blogs
router.get("/view/:id", blogsController.viewpage);

// Deleting blogs
router.get("/delete/:id", blogsController.deletepage);

// Search blogs by title, author
router.post("/search", blogsController.searchpage);

// Editing myblogs
router.get("/edit/:id", blogsController.editpage);
router.put("/edit/:id", blogsController.posteditpage);

module.exports = router;
