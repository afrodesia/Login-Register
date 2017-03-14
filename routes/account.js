var express = require('express');
var router = express.Router();
var controllers = require('../controllers')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

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
	if (req.session.token === null){
		res.json({
			confirmation: 'Success',
			user: null
		})
		return
	}
	jwt.verify(req.session.token,'1234', function(err, decode){
		if(err){
			res.json({
				confirmation: 'Failed',
				message: 'Token is Invalid!'
			})
			return
		}
		res.json({
			confirmation: 'Success',
			token: decode
		})
	})
	// res.json({
	// 	confirmation: 'Success',
	// 	user: req.session.user
	// })
})

router.post('/login', function(req, res, next){
	var formData = req.body
	controllers.profile
	.get({email: formData.email}, true)
	.then(function(profiles){

		if(profiles.length === 0){
			res.json({
				confirmation:'Failed',
				message: 'Profile not found..'
			})
			return
		}
		var profile = profiles[0]

		var passwordCorrect = bcrypt.compareSync(formData.password, profile.password)
		if(passwordCorrect === false){
			req.session.reset()
			res.json({
				confirmation: 'Failed',
				message: 'Wrong Password!'
			})
			return
		}
		req.session.user = profile._id.toString() // attach session
		req.session.token = jwt.sign({id: profile._id.toString()}, '1234', {expiresIn:4000})
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