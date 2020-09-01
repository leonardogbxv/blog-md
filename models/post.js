const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
});

// slug validation
PostSchema.pre('validate', function(next) {
  if(this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true});
  }

  next();
});

module.exports = mongoose.model('Post', PostSchema);