const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  text: {
    type: String,
    trim: true,
    default: ''
  },
  image: {
    type: String, // URL from cloudinary or base64 string
    default: ''
  },
  likes: [{
    type: String // Storing usernames as per requirements
  }],
  comments: [commentSchema]
}, { timestamps: true });


module.exports = mongoose.model('Post', postSchema);
