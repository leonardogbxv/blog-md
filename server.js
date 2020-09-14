const express = require('express');
const app = express();
const connectDB = require('./db');
const methodOverride = require('method-override');
const postRouter = require('./routes/posts');
const adminRouter = require('./routes/admin');
const Post = require('./models/post');

require('dotenv/config');

// Connect to DB
connectDB();

// view engine setup
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use(express.static('public'));

// Allows the use of PUT/DELETE overriding other methods
app.use(methodOverride('_method'));

// Main route
app.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: 'desc' });

  res.render('posts/index', { posts: posts });
});

// Routes
app.use('/posts', postRouter);
app.use('/admin', adminRouter);

// Start listening to the server
app.listen(3000);
