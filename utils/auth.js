const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect('/login'); // this will call /views/login.handlebars & the login.handlebars will create httml and call public/js/login.js
  } else {
    next();
  }
};
 
 module.exports = withAuth;