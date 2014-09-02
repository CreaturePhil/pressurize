var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var User = mongoose.Schema({
  displayname: String,
  username: String,
  password: String,
  date: { type: Date, default: Date.now },
  avatar: String,
  location: String,
  about: String,
  twitter: String,
  github: String,
  posts: []
});

User.plugin(passportLocalMongoose, { usernameLowerCase: true });

module.exports = mongoose.model('user', User)
