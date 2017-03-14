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

router.get('/currentuser', function(req, res, next){
	if (req.session === null){
		res.json({
			confirmation: 'Success',
			user: null
		})
		return
	}
	if (req.session.user === null){
		res.json({
			confirmation: 'Success',
			user: null
		})
		return
	}
	res.json({
		confirmation: 'Success',
		user: req.session.user
	})
})

router.post('/login', function(req, res, next){
	var formData = req.body
	controllers.profile
	.get({email: formData.email})
	.then(function(profiles){
		var profile = profiles[0]
		if(profiles.length === 0){
			res.json({
				confirmation:'Failed',
				message: 'Profile not found..'
			})
			return
		}

		req.session.user = profile.id
		res.redirect('/profile')

	})	
	.catch(function(err){
		res.json({
			confirmation:'Failed',
			message: err
		})
	})
})

module.exports = router