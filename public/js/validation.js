const redirectHome = (req, res, next) => {
  if(req.session.userId) {
    res.redirect('/');
  } else {
    next();
  }
}

const redirectLogin = (req, res, next) => {
  if(!req.session.userId) {
    res.redirect('/admin/login');
  } else {
    next();
  }
}

module.exports = {
  redirectHome: redirectHome,
  redirectLogin: redirectLogin
}