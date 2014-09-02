var User = require('../models/user');
var Post = require('../models/post');

exports.post = function(req, res) {
  post = new Post({
    title: req.body.title,
    type: 'Normal',
    body: req.body.body,
    author: req.user.displayname,
    username: req.user.username
  });
  post.save(function(err, ref) {
    User.findOne({username: req.user.username}, function(err, user) {
      user.posts.push(ref);
      user.save();
      res.redirect('/dashboard');
    });
  });
}

exports.update_post
