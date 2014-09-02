var passport = require('passport');
var User = require('../models/user');

function Registration(req, res) {
  var validation = validate_registration(req.body);
  if (validation !== 'success') {
    req.flash('info', validation);
    return res.redirect('/register');
  }
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
    if (err) {
      req.flash('info', err.message);
      return res.redirect('/register');
    }
    user.displayname = req.body.username;
    user.save();
    req.flash('error', 'Succesfully registered!');
    res.redirect('/login');
  });
}

function validate_registration(body) {
  if (!body.username || !body.password || !body.confirmation) return "Please enter a username or password.";
  if (!body.username.match(/^[A-Za-z0-9]*$/)) return "Username can only contain letters and numbers.";
  if (body.username.length > 28) return "Username cannot be longer than 27 characters.";
  if (body.password.length < 6 || body.password.length > 52) return "Password must be between 6 to 52 characters long.";
  if (body.password !== body.confirmation) return "Your password must match.";
  return 'success';
}

module.exports = Registration;
