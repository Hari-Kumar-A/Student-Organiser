const blogsmodel = require("../models/blogsmodel");
const studentsmodel = require("../models/studentsmodel");

module.exports.blogspage = async (req, res) => {
    try {
        const blogdata = await blogsmodel.find();
        res.render("blogs", { blogdata });
    } catch (error) {
        console.log("error:", error);
    }
};

module.exports.addblog = async (req, res) => {
    try {
        res.render("addblog");
    } catch (error) {
        console.log("Error", error);
    }
};

module.exports.postblog = async (req, res) => {
    try {
        const authordata = await studentsmodel.findById({
            _id: req.session.studentId,
        });
        const author = authordata.fullname;
        const data = {
            title: req.body.title,
            content: req.body.content,
            studentId: req.session.studentId,
            author: author,
        };
        const newBlog = new blogsmodel(data);
        await newBlog.save();
        res.redirect("/blogs");
    } catch (error) {
        console.log("Error", error);
    }
};

module.exports.viewpage = async (req, res) => {
    try {
        const blogdata = await blogsmodel.findById({ _id: req.params.id });

        res.render("viewblog", { blogdata });
    } catch (error) {
        console.log("Error", error);
    }
};

module.exports.deletepage = async (req, res) => {
    try {
        await blogsmodel.deleteOne({ _id: req.params.id });
        res.redirect("/blogs");
    } catch (error) {
        console.log("Error", error);
    }
};

//search page
module.exports.searchpage = async (req, res) => {
    const searchblog = req.body.searchblog;

    try {
        const searchblogdata = await blogsmodel.find({
            $or: [
                { title: { $regex: new RegExp(searchblog, "i") } },
                { author: { $regex: new RegExp(searchblog, "i") } },
            ],
        });
        res.render("searchblog", { searchblogdata });
    } catch (error) {
        console.log("error", error);
    }
};

module.exports.myblogs = async (req, res) => {
    try {
        const blogdata = await blogsmodel.find({
            studentId: req.session.studentId,
        });
        res.render("myblogs", { blogdata });
    } catch (error) {
        console.log("error:", error);
    }
};

//editing myblogs
module.exports.editpage = async (req, res) => {
    try {
        const blogdata = await blogsmodel.findOne({ _id: req.params.id });
        res.render("editblog", { blogdata });
    } catch (error) {
        console.error("Error:", error);
    }
};

module.exports.posteditpage = async (req, res) => {
    try {
        const editedblog = await blogsmodel.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            content: req.body.content,
        });
        await editedblog.save();
        res.redirect("/blogs/myblogs");
    } catch (error) {
        // Handle the error here
        console.error("Error:", error);
    }
};
