const bcrypt = require("bcrypt");
const studentsmodel = require("../models/studentsmodel");

module.exports.getloginpage = async (req, res) => {
  res.render("login", { layout: false });
};

module.exports.postloginpage = async (req, res) => {
  try {
    const student = await studentsmodel.findOne({ email: req.body.email });
    if (!student) {
      return res.send("Email Not Registered with us");
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      student.password
    );
    if (passwordMatch) {
      req.session.studentId = student._id;
      req.session.fullname = student.fullname;
      req.session.email = student.email;
      res.redirect("/");
    } else {
      res.send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
