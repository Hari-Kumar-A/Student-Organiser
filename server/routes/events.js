const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

// Showing all events and classes
router.get("/", eventsController.eventspage);

// Adding events and classes
router.get("/addevent", eventsController.addEvent);
router.post("/addevent", eventsController.postEvent);

// View event
router.get("/view/:id", eventsController.viewpage);

// Edit event
router.get("/edit/:id", eventsController.editpage);
router.put("/edit/:id", eventsController.posteditpage);

// Delete event
router.get("/delete/:id", eventsController.deletepage);
router.delete("/delete/:id", eventsController.postdeletepage);

// Calendar view of events
router.get("/calendarevent", eventsController.calendarpage);

// Search events
router.post("/search", eventsController.searchpage);

module.exports = router;
