// posts.js                                    //
// All routes directly related to our '/posts' //
const express = require('express');
const router = express.Router();
const Post = require('./../models/post');
const { findById } = require('./../models/post');

// Relative to '/posts' route in server.js
router.get('/new', (req, res) => {
  res.render('posts/new', { post: new Post() });
});

router.get('/edit/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('posts/edit', { post: post });
});

router.get('/:slug', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if(post == null) {
    res.redirect('/');
  }
  res.render('posts/show', { post: post });
});

// Post route to create a new blog 'post'
router.post('/', async (req, res, next) => {
  req.post = new Post();
  next();
}, savePost('new'));

router.put('/:id', async (req, res, next) => {
  req.post = await Post.findById(req.params.id);
  next();
}, savePost('edit'));

// Delete blog 'post'
router.delete('/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Save blog 'post' and redirect (middleware)
function savePost(path) {
  return async (req, res) => {
    let post = req.post
    post.title = req.body.title,
    post.category = req.body.category,
    post.description = req.body.description,
    post.markdown = req.body.markdown
    try {
      post = await post.save();
      res.redirect(`/posts/${post.slug}`);
    } catch(e) {
      console.log(e);
      res.render(`posts/${path}`, { post: post });
    }
  }
}

module.exports = router;