const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');

// Allows DOMPurify to create HTML and purify it with the JSDOM window object
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const DOMPurify = createDOMPurify(new JSDOM().window);

const postSchema = new mongoose.Schema({
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
  },
  sanitizedHTML: {
    type: String,
    required: true
  }
});

// validations
postSchema.pre('validate', function(next) {
  // create slug based on the 'post title'
  if(this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true});
  }
  // converts the markdown to HTML and sanitize it
  if(this.markdown) {
    this.sanitizedHTML = DOMPurify.sanitize(marked(this.markdown));
  }

  next();
});

module.exports = mongoose.model('Post', postSchema);