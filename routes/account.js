var express = require('express');
var router = express.Router();
var controllers = require('../controllers')

router.post('/register', function(req, res, next){
	var formData = req.body
	controllers.profile
	.post(formData)
	.then(function(profile){
		res.redirect('/profile')
		return
	})	
	.catch(function(err){
		next(err)
	})
})

module.exports = router