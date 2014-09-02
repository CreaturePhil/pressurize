var express = require('express');
var passport = require('passport');

// utils
var restrict = require('../utils/restrict');
var date = require('../utils/date');

// models
var User = require('../models/user');

// post requests
var registration = require('./registration');
var add_post = require('./post').post;
var account = require('./account');

var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { 
    flash: req.flash('info'),
    user: req.user
  });
});

router.get('/register', restrict.user, function(req, res) {
  res.render('register', { 
    flash: req.flash('info'), 
    csrf: req.csrfToken()
  });
});

router.get('/login', restrict.user, function(req, res) {
  res.render('login', { 
    flash: req.flash('error'), 
    csrf: req.csrfToken()
  });
});

router.get('/dashboard', restrict.guest, function(req, res) {
  res.render('dashboard2', { 
    flash: req.flash('info'),
    user: req.user,
    csrf: req.csrfToken(),
    format_date: date.diff_date
  });
});

router.get('/account', restrict.guest, function(req, res) {
  res.render('account', {
    flash: req.flash('info'),
    user: req.user,
    csrf: req.csrfToken(),
    avatar: req.flash('avatar'),
    username: req.flash('username'),
    location: req.flash('location'),
    about: req.flash('about'),
    twitter: req.flash('twitter'),
    github: req.flash('github'),
    password: req.flash('password')
  }); 
});

router.get('/logout', restrict.guest, function(req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/register', registration);

router.post('/login', 
  passport.authenticate('local', { 
    successRedirect: '/dashboard', 
    failureRedirect: '/login', 
    failureFlash: 'Invalid username or password.' 
  })
);

router.post('/add_post', restrict.guest, add_post);

router.post('/account', restrict.guest, account);

module.exports = router;
