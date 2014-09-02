/*
 * Restrict
 * Type - Object with three function property
 * Restrict guests or users from certain pages.
 */

var Restrict = {

  main: function(client, res, next) {
    if (client) {
      res.redirect('/');
    }
    next();
  },

  guest: function(req, res, next) {
    Restrict.main(!req.user, res, next);
  },

  user: function(req, res, next) {
    Restrict.main(req.user, res, next);
  }

};

module.exports = Restrict;
