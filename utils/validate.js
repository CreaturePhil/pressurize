var Validate = (function() {

  var IMAGE_AVATAR_REGEX = /^https?:\/\/(?:[a-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/;
  var NAME_REGEX = /^[A-Za-z0-9]*$/;
  var LOCATION_REGEX = /^[A-Za-z, ]*$/;

  var MAX_NAMESPACE_LENGTH = 52;
  var MAX_ABOUT_LENGTH = 480;
  var MIN_PASS_LENGTH = 6;
  var MAX_PASS_LENGTH = 52;

  // Validates the argument
  function _validate(arg) {
    if (arg) {
      return true;
    }
    return false;
  }

  return {

    /* 
     * main - response to the validation
     *
     * user {object}
     * req {object}
     * options {object}
     *   - prop {String}
     *   - body {String}
     */
    main: function(user, req, options) {
      if (req.body[options.body] && req.body[options.body].trim().length > 0) {
        if (Validate[options.body](req.body[options.body], req)) {
          if (options.body === 'username') {
            user['displayname'] = req.body[options.body];
            user.save();
          } else if(options.body === 'password') {
            user.setPassword(req.body[options.body], function() {
              user.save();
            });
          } else {
            user[options.body] = req.body[options.body];
            user.save();
          }
        } else {
          req.flash("info", "Error - Something went wrong!");
          req.flash(options.body, options.message);
          req.account_validated = false;
        }
      }
    },

    avatar: function(image_url) {
      return _validate(image_url.match(IMAGE_AVATAR_REGEX));
    },

    username: function(name, req) {
      return _validate(name.match(NAME_REGEX) && (name.toLowerCase() === req.user.username));
    },

    location: function(loc) {
      return _validate(loc.match(LOCATION_REGEX) && loc.length <= MAX_NAMESPACE_LENGTH); 
    },

    about: function(info) {
      return _validate(info.length <= MAX_ABOUT_LENGTH);
    },

    twitter: function(name) {
      return _validate(name.match(NAME_REGEX) && name.length <= MAX_NAMESPACE_LENGTH);
    },

    github: function(name) {
      return _validate(name.match(NAME_REGEX) && name.length <= MAX_NAMESPACE_LENGTH);
    },

    password: function(pass) {
      return _validate(pass.length >= MIN_PASS_LENGTH && pass.length <= MAX_PASS_LENGTH);
    }

  };

})();

module.exports = Validate;
