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
  
ensureProfile : function (req, res, next) { 
  if(req.user){
    return next()
  } else res.render('index')
}

};
