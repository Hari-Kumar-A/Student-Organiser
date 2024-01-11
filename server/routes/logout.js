module.exports.isLogout=(req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
    }
    res.redirect("/login"); // Will always fire after the session is destroyed
  });
};