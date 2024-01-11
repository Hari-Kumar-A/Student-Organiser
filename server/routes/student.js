const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/middleware"); 
const blogsController = require("../controllers/blogsController");
const dashboardController = require("../controllers/dashboardController");
const eventsRouter = require("../routes/events"); 
const expensesRouter=require("../routes/expenses");
const coursesRouter = require("../routes/courses");  
const blogsRouter = require("../routes/blogs");  

//DashboardPage
router.get("/", authMiddleware.isAuthenticated, dashboardController.homepage);

//events routes
router.use("/events", authMiddleware.isAuthenticated, eventsRouter);

//expense routes    
router.use("/expenses", authMiddleware.isAuthenticated, expensesRouter); 

// courses routes
router.use("/courses", authMiddleware.isAuthenticated, coursesRouter);

// blogs routes
router.use("/blogs", authMiddleware.isAuthenticated, blogsRouter);
 
module.exports = router;
