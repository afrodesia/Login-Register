var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login Grids - ' });
});
/* GET home page. */
router.get('/forms', function(req, res, next) {
  res.render('forms', { title: 'Login Forms - ' });
});
/* GET home page. */
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Login Profile - ' });
});
module.exports = router;
