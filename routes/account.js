var User = require('../models/user');
var validate = require('../utils/validate');

function Account(req, res) {
  req.account_validated = true;
  User.findOne({ username: req.user.username }, function(err, user) {
    validate.main(user, req, {
      body: 'avatar',
      message: 'Invalid image url.'
    });

    validate.main(user, req, {
      body: 'username',
      message: 'Invalid username. Currently you can only change the case-sensitivity of your username and not to another username'
    });

    validate.main(user, req, {
      body: 'location',
      message: 'Location can only contain spaces, commas, and letters. Length has to be less than or equal to 52.'
    });

    validate.main(user, req, {
      body: 'about',
      message: 'Length has to be less than or equal to 480.'
    });

    validate.main(user, req, {
      body: 'twitter',
      message: 'Only letters and numbers are allowed. Length has to be less than or equal to 52.'
    });

    validate.main(user, req, {
      body: 'github',
      message: 'Only letters and numbers are allowed. Length has to be less than or equal to 52.'
    });

    validate.main(user, req, {
      body: 'password',
      message: 'Password must be between 6 to 52 characters.'
    });

    if (req.account_validated) {
      req.flash("info", "Changes are saved.")
    }
    res.redirect('/account');
  });
}

module.exports = Account;
