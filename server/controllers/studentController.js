module.exports.homepage = async (req, res) => {
  res.render("index", { fullname: req.session.fullname });
};
