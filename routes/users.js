var express = require('express');

// utils
var date = require('../utils/date');

// models
var User = require('../models/user');
var Post = require('../models/post');

var router = express.Router();

router.get('/:name', function(req, res) {
  User.findOne({username: req.params.name.toLowerCase()}, function(err, user) {
    if (!user) return res.render('404', { flash: req.flash('info'), user: req.user });
    res.render('user', {
      flash: req.flash('info'),
      user: req.user,
      name: user,
      format_date: date.format_date,
      diff_date: date.diff_date,
    });
  });
});

module.exports = router;
