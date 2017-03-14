var express = require('express');
var router = express.Router();
var controllers = require('../controllers')
var jwt = require('jsonwebtoken')

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
	if (req.session === null){
		res.render('profile', null)
		return
	}
	if (req.session.token === null){
		res.render('profile', null)
		return

	}
  	jwt.verify(req.session.token, process.env.TOKEN_SECRET, function(err, decode){
		if(err){
			res.render('profile', null)
			return
		}
		controllers.profile
		.getById(decode.id)
		.then(function(profile){
			res.render('profile', profile)
		})
		.catch(function(err){
			res.render('profile', null)
		})
		
	})
});
module.exports = router;
