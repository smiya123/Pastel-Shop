function isLoggedIn(req, res, next) {
    if (req.session.isLoggedIn) {
      next();
    } else {
      res.redirect('/sign');
    }
  }
  
  module.exports = isLoggedIn;