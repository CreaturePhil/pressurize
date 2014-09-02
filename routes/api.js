// NOTE TO SELF: MAKE SURE TO VALIDATE POSTS
var express = require('express');

// utils
var restrict = require('../utils/restrict');

// models
var User = require('../models/user');
var Post = require('../models/post');

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// Getting All Posts - GET /api/posts
router.get('/posts', function(req, res) {
  Post.find(function(err, posts) {
    res.json(posts);
  });
});

// Getting a Single Post - GET /api/posts/:post_id
router.get('/posts/:post_id', function(req, res) {
  Post.findById(req.params.post_id, function(err, post) {
    res.json(post);
  });
});

// Creating a Post - POST /api/posts
router.post('/posts', restrict.guest, function(req, res) {
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
    });
  });
});

// Updating a Post’s Info - PUT /api/posts/:post_id
router.put('/posts/:post_id', restrict.guest, function(req, res) {
  Post.findById(req.params.post_id, function(err, post) {
    var posts = req.user.posts;
    var len = posts.length;
    while(len--) {
      if (posts[len] === post) {
        posts.splice(len, 1);
      }
    }
    post.title = req.body.title;
    post.body = req.body.body;
    post.edit = (new Date());
    post.save(function(err, post) {
      User.findOne({ username: post.username }, function(err, user) {
        user.posts.push(post);
        user.save();
      });
    });
  });
});

// Deleting a Post - DELETE /api/posts/:post_id
router.delete('/posts/:post_id', restrict.guest, function(req, res) {
  Post.remove({ _id: req.params.bear_id }, function(err, post) {
    User.findOne({ username: post.username }, function(err, user) {
      var posts = user.posts;
      var len = user.posts.length;
      while(len--) {
        if (posts[len] === post) {
          posts.splice(len, 1);
        }
      }
    });
  });
});

module.exports = router;
