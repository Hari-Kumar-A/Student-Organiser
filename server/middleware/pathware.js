const path=require('path')
function addPathModule(req, res, next) {
    res.locals.path = path;
    next();
  }
  
  module.exports = addPathModule;