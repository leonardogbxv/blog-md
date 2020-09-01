// posts.js                                    //
// All routes directly related to our '/posts' //
const express = require('express');
const router = express.Router();
const Post = require('./../models/post');

// Relative to '/posts' route in server.js
router.get('/new', (req, res) => {
  res.render('posts/new', { post: new Post() });
});

router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if(post == null) {
    res.redirect('/');
  }
  res.render('posts/show', { post: post });
});

router.post('/', async (req, res) => {
  let post = new Post({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    markdown: req.body.markdown
  });

  try {
    post = await post.save(); // will add an 'id' to our post
    res.redirect(`/posts/${post.id}`);
  } catch(e) {
    console.log(e);
    res.render('posts/new', { post: post });
  }
});

module.exports = router;