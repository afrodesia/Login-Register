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
module.exports = router;
