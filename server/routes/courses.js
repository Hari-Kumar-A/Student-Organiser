const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/coursesController");

// Showing all courses & credits
router.get("/", coursesController.coursespage);

// Adding course & credit
router.get("/addcourse", coursesController.addcourse);
router.post("/addcourse", coursesController.postcourse);

// Edit course & credit
router.get("/edit/:id", coursesController.editpage);
router.put("/edit/:id", coursesController.posteditpage);

// Delete course & credit
router.get("/delete/:id", coursesController.deletepage);
router.delete("/delete/:id", coursesController.postdeletepage);

module.exports = router;
