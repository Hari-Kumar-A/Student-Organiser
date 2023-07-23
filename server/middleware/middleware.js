module.exports.isAuthenticated = (req, res, next) => {
    console.log(req.session.studentId)
    if (req.session.studentId) {
      // User is authenticated, proceed to the next middleware or route handler
    //   console.log(req.session.studentId)
      return next();
    } else {
      // User is not authenticated, redirect to the login page or display an error message
      return res.redirect('/login'); // Change '/login' to the actual login route in your application
    }
  };
  