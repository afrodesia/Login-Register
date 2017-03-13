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


router.post('/login', function(req, res, next){
	var formData = req.body
	controllers.profile
	.get({email: formData.email})
	.then(function(profile){
		res.json({
			confirmation:'Success',
			profile: profile
		})
	})	
	.catch(function(err){
		res.json({
			confirmation:'Failed',
			message: err
		})
	})
})

module.exports = router