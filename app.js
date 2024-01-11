//imports
const express = require("express");
require("dotenv").config(); 
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const connectDB = require("./server/config/database");
const session = require("express-session");
const authMiddleware = require("./server/middleware/middleware");
const logoutController=require("./server/routes/logout.js") 

//instance
const app = express();

//connect to student database
connectDB();

//Port
const PORT = 3002 || process.env.PORT;

//session setup
app.use(
  session({
    secret: process.env.SECRET_KEY, // Replace with your own secret key for session encryption
    resave: false,
    saveUninitialized: false,
  })
);

//to fetch forms data to mongodb
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

//to server static files
app.use(express.static("public"));

//ejs
app.set("view engine", "ejs");
app.use(expressLayout);
app.set("layout", "./layouts/layout");

//clearance of cache to prevent user to access using browser cache back button
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache", "no-store", "must-revalidate");
  next();
});

//high security to login
const preventCaching = (req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
};

app.use(preventCaching);

//Routes
app.use("/login", require("./server/routes/login.js"));
app.use("/register", require("./server/routes/register.js"));
app.use("/", authMiddleware.isAuthenticated, require("./server/routes/student.js"));
app.get("/logout", authMiddleware.isAuthenticated, logoutController.isLogout);
app.get("*", (req, res) => {res.status(404).render("404");});

//PORT
app.listen(PORT,()=>console.log("Server is running in "+PORT));
