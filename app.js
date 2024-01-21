const express = require("express");
require("dotenv").config();
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const connectDB = require("./server/config/database");
const session = require("express-session");
const flash = require("connect-flash");
const authMiddleware = require("./server/middleware/middleware");
const logoutController = require("./server/routes/logout.js");

// Corrected module import
const studentsmodel = require("./server/models/studentsmodel");

const app = express();

// Connect to student database
connectDB();

// Port
const PORT = 3004 || process.env.PORT;

// Session setup
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// Flash messages setup
app.use(flash());

// To fetch forms data to mongodb
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// To serve static files
app.use(express.static("public"));

// EJS
app.set("view engine", "ejs");
app.use(expressLayout);
app.set("layout", "./layouts/layout");

// Clearance of cache to prevent users from accessing using the browser cache back button
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  next();
});

// High security to login
const preventCaching = (req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
};

app.use(preventCaching);

// Routes
app.use("/login", require("./server/routes/login.js"));
app.use("/register", require("./server/routes/register.js"));
app.use("/", authMiddleware.isAuthenticated, require("./server/routes/student.js"));
app.get("/logout", authMiddleware.isAuthenticated, logoutController.isLogout);
app.get("*", (req, res) => {
  res.status(404).render("404");
});

// Port
app.listen(PORT, () => console.log("Server is running in " + PORT));



