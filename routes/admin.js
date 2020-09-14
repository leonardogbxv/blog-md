const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin');
});

router.get('/posts', (req, res) => {
  res.send('Rota de posts do admin!');
});

module.exports = router;