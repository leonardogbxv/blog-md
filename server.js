const express = require('express');
const session = require('express-session');
const app = express();
const connectDB = require('./db');
const methodOverride = require('method-override');
const postRouter = require('./routes/posts');
const adminRouter = require('./routes/admin');
const Post = require('./models/post');
const { formatDate } = require('./public/js/formatDate');

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
  const page = parseInt(req.query.page) || 1;
  const limit = 7;
  const skip = (limit * page) - limit;
  const totalPosts = await Post.countDocuments();

  const posts = await Post.find().sort({ createdAt: 'desc' }).skip(skip).limit(limit);
  const { userId } = req.session;

  res.render('posts/index', { 
    posts: posts, 
    userId: userId,
    currentPage: page,
    totalPages: Math.ceil(totalPosts / limit),
    formatDate: formatDate 
  });
});

// Routes
app.use('/posts', postRouter);
app.use('/admin', adminRouter);

// Start listening to the server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server is listening to port ${port}`);
