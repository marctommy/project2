module.exports = {
  ensureAuth : function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  },

  ensureGuest : function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  },
};
