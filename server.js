const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRouter = require('./routes/posts');
const Post = require('./models/post')

require('dotenv/config');

// Connect to DB
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_CONNECTION, () => console.log('connected to DB!'));

// view engine setup
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

// Allows the use of PUT/DELETE overriding other methods
app.use(methodOverride('_method'));

// index.ejs
app.get('/', async (req, res) => {
  // const posts = [{
  //   title: 'Post title',
  //   category: 'Post category',
  //   description: 'Post description..',
  //   createdAt: new Date()
  // },
  // {
  //   title: 'Post title2',
  //   category: 'Post category2',
  //   description: 'Post description..2',
  //   createdAt: new Date()
  // }
  // ];

  const posts = await Post.find().sort({ createdAt: 'desc' });

  res.render('posts/index', { posts: posts });
});

// Routes created in 'postRouter' will be added to '/posts' route
// Ex: '/posts/new', '/posts/edit', ...
app.use('/posts', postRouter);

// Start listening to the server
app.listen(3000);
