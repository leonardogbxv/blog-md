const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const validation = require("../public/js/validation");

// Multer middleware (files upload)
const storage = multer.diskStorage({
  destination: 'public/images/uploads/',
  filename: function (req, file, cb) {
    // generate a random 16 character string
    crypto.randomBytes(16, (err, buf) => {
      if(err) {
        return cb(err);
      }
      // ex: myImg.jpg => "32c8a9f50c2ca07791018251fce9e542".jpg
      cb(null, buf.toString('hex') + path.extname(file.originalname));
    });
  }
});

const upload = multer({ storage: storage });

// Admin routes
router.get('/login', validation.redirectHome, (req, res) => {
  const { userId } = req.session;

  res.render('admin/login', { userId: userId });
});

router.get('/upload', validation.redirectLogin, (req, res) => {
  const { userId } = req.session;

  res.render('admin/upload', { userId: userId });
});

router.post('/', validation.redirectHome, (req, res) => {
  const { login, password } = req.body;

  if(login && password) {
    const user = process.env.APP_LOGIN === login && process.env.APP_PWD === password;

    if(user) {
      req.session.userId = process.env.APP_ID;
      return res.redirect('/');    
    }
  }

  res.redirect('/admin/login');
});

router.post('/upload', validation.redirectLogin, upload.single('blog-img'), (req, res) => {
  if (!req.file) {
    console.error("No file received..");
    return res.send('No file received..');
  } else {
    console.log('File received!');
    return res.json(req.file);
  }
});

router.post('/logout', validation.redirectLogin, (req, res) => {
  req.session.destroy(err => {
    if(err) {
      console.error(`An error has occurred: ${err}`);
      return res.redirect('/');
    }

    res.clearCookie(process.env.SESS_NAME);
    res.redirect('/admin/login');
  });
});

module.exports = router;