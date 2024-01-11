const coursemodel = require("../models/coursemodel");
const eventsmodel = require("../models/eventsmodel");
const expensesmodel = require("../models/expensesmodel");
const blogsmodel = require("../models/blogsmodel");

//adding course get
module.exports.homepage = async (req, res) => {
  const eventsCount = await eventsmodel.countDocuments({
    studentId: req.session.studentId,
  });
  const expensesCount = await expensesmodel.countDocuments({
    studentId: req.session.studentId,
  });
  const coursesCount = await coursemodel.countDocuments({
    studentId: req.session.studentId,
  });
  const blogsCount = await blogsmodel.countDocuments({
    studentId: req.session.studentId,
  });
  const studentname = req.session.fullname;
  try {
    res.render("dashboard", {
      eventsCount,
      expensesCount,
      coursesCount,
      studentname,
      blogsCount,
    });
  } catch (error) { 
    res.status(500).send("An error occurred while data in dashboard.");
  }
};
