const coursemodel = require("../models/coursemodel");

//adding course get
module.exports.addcourse = async (req, res) => {
  try {
    res.render("addcourse");
  } catch (error) { 
    res.status(500).send("An error occurred while fetching courses data.");
  }
};

//adding course post
module.exports.postcourse = async (req, res) => {
  try {
    console.log(req.body);
    const data = {
      course: req.body.course,
      credit: req.body.credit,
      grade: req.body.grade,
      studentId: req.session.studentId,
    };

    const newCourse = new coursemodel(data);
    await newCourse.save();
    res.redirect("/courses");
  } catch (error) { 
    res.status(500).send("An error occurred while adding courses data.");
  }
};

//viewing all courses
module.exports.coursespage = async (req, res) => {
  try {
    const coursesdata = await coursemodel.find({
      studentId: req.session.studentId,
    }); 
    res.render("courses", { coursesdata });
  } catch (error) { 
    res.status(500).send("An error occurred while viewing courses data.");
  }
};

//editing course
module.exports.editpage = async (req, res) => {
  try {
    const coursedata = await coursemodel.findOne({ _id: req.params.id });
    res.render("editcourse", { coursedata });
  } catch (error) { 
    res.status(500).send("An error occurred while editing courses data.");
  }
};

module.exports.posteditpage = async (req, res) => {
  try {
    const editedcourse = await coursemodel.findByIdAndUpdate(req.params.id, {
      course: req.body.course,
      credit: req.body.credit,
      grade: req.body.grade,
      studentId: req.session.studentId,
    });
    await editedcourse.save();
    res.redirect("/courses");
  } catch (error) { 
    res.status(500).send("An error occurred while editingcourses data.");
  }
};

//deleting a course
module.exports.deletepage = async (req, res) => {
  try {
    const coursedata = await coursemodel.findOne({ _id: req.params.id });
    res.render("deletecourse", { coursedata });
  } catch (error) { 
    res.status(500).send("An error occurred while deleting courses data.");
  }
};
module.exports.postdeletepage = async (req, res) => {
  try {
    await coursemodel.deleteOne({ _id: req.params.id });
    res.redirect("/courses");
  } catch (error) { 
    res.status(500).send("An error occurred while deleting courses data.");
  }
};
 