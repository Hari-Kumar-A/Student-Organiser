// loginController.js
const express=require("express");
const bcrypt = require("bcrypt");
const studentsmodel = require("../models/studentsmodel.js");
const flash = require("connect-flash"); // Import connect-flash module

// Initialize flash
const app = express();
app.use(flash());

module.exports.getloginpage = async (req, res) => {
  res.render("login", { layout: false, errorMessage: req.flash("error") });
};
// loginController.js

module.exports.postloginpage = async (req, res) => {
  try {
    const student = await studentsmodel.findOne({ email: req.body.email });
    if (!student) {
      const errorMessage = "Email Not Registered with us";
      return res.render("login", { layout: false, errorMessage });
    } else {
      const passwordMatch = await bcrypt.compare(req.body.password, student.password);
      if (passwordMatch) {
        req.session.studentId = student._id;
        req.session.fullname = student.fullname;
        req.session.email = student.email;
        return res.redirect("/");
      } else {
        const errorMessage = "Invalid credentials";
        return res.render("login", { layout: false, errorMessage });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};


      





