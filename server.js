const express = require('express');
const session = require('express-session');
const app = express();
const connectDB = require('./db');
const methodOverride = require('method-override');
const postRouter = require('./routes/posts');
const adminRouter = require('./routes/admin');
const Post = require('./models/post');

// dotenv config
try {
  require('dotenv').config();
} catch (err) {
  console.log(err);
}

// Connect to DB
connectDB();

// view engine setup
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use(express.static('public'));

// Allows the use of PUT/DELETE overriding other methods
app.use(methodOverride('_method'));

// session config
const IN_PROD = process.env.NODE_ENV === 'production';

app.use(session({
  name: process.env.SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESS_SECRET,
  cookie: {
    maxAge: Number(process.env.SESS_TIME),
    sameSite: true,
    secure: IN_PROD,
  }
}));

// Main route
app.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: 'desc' });
  const { userId } = req.session;
  // console.log('index:'+req.sessionID);

  res.render('posts/index', { posts: posts, userId: userId});
});

// Routes
app.use('/posts', postRouter);
app.use('/admin', adminRouter);

// Start listening to the server
app.listen(process.env.PORT || 3000);
