var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, ref: 'User', required: true },
  username: { type: String, required: true },
  date: { type: Date, default: Date.now },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  edit: Date,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

var Post = mongoose.model('post', postSchema);

module.exports = Post;
