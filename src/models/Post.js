const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      default: 'guest'
    },
    summary: {
      type: String,
      default: ''
    },
    keywords: {
      type: [String],
      default: []
    },
    tone: {
      type: String,
      default: 'neutral'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', postSchema);
