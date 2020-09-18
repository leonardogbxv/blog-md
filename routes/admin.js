const express = require('express');
const router = express.Router();

// middlewares
const redirectHome = (req, res, next) => {
  if(req.session.userId) {
    res.redirect('/');
  } else {
    next();
  }
}

const redirectLogin = (req, res, next) => {
  if(!req.session.userId) {
    res.redirect('/login')
  } else {
    next();
  }
}

// Admin routes
router.get('/', redirectHome, (req, res) => {
  const { userId } = req.session;

  res.render('admin', { userId: userId });
});

router.post('/', redirectHome, (req, res) => {
  const { login, password } = req.body;

  if(login && password) {
    const user = process.env.APP_LOGIN === login && process.env.APP_PWD === password;

    if(user) {
      req.session.userId = process.env.APP_ID;
      return res.redirect('/');    
    }
  }
  
  // await User.find({ login: login, password: password }, (err, user) => {
  //   if(err) {
  //     return console.log(`Error has occurred: ${err}`);
  //   }
  //   console.log(login);
  //   if(user) {
  //     if(user.login === login && user.password === password) {
  //       console.log('caiu aqui')
  //       req.session.userId = user._id;
  //       return res.redirect('/');
  //     } else {
  //       console.log('Wrong credentials! Try again...');
  //     }
  //   }
  // });

  res.redirect('/admin');
});

router.post('/logout', redirectLogin, (req, res) => {
  req.session.destroy(err => {
    if(err) {
      console.error(`An error has occurred: ${err}`);
      return res.redirect('/');
    }

    res.clearCookie(process.env.SESS_NAME);
    res.redirect('/admin');
  });
});

module.exports = router;