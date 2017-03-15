var express = require('express');
var router = express.Router();
var controllers = require('../controllers')
var Promise =  require('bluebird')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

router.post('/register', function(req, res, next){
	var formData = req.body
	controllers.profile
	.post(formData)
	.then(function(profile){
		req.session.token = jwt.sign({id: profile.id}, process.env.TOKEN_SECRET, {expiresIn:4000})
		res.redirect('/profile')
		return
	})	
	.catch(function(err){
		next(err)
	})
})
router.get('/logout', function(req, res, next){
	req.session.reset()
	res.json({
		confirmation: 'Success',
		user: null
	})
	return
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
	jwt.verify(req.session.token, process.env.TOKEN_SECRET, function(err, decode){
		if(err){
			res.json({
				confirmation: 'Failed',
				message: 'Token is Invalid!'
			})
			return
		}
		controllers.profile
		.getById(decode.id)
		.then(function(profile){
			res.json({
				confirmation: 'Success',
				user: profile
			})
		})
		.catch(function(err){
			res.json({
				confirmation: 'Failed',
				message: err
			})
		})
		
	})
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
		req.session.token = jwt.sign({id: profile._id.toString()}, process.env.TOKEN_SECRET, {expiresIn:4000})
		res.redirect('/profile')

	})	
	.catch(function(err){
		res.json({
			confirmation:'Failed',
			message: err
		})
	})
})

router.post('/comment', function(req, res, next){

	if(req.session.token === null){
		res.json({
			confirmation: 'Failed',
			message: 'Not logged in to make a comment'
		})
		return
	}
	var token = req.session.token
	jwt.verify(token, process.env.TOKEN_SECRET, function(err, decode){
		if(err){
			res.json({
				confirmation: 'Failed',
				message: 'Invalid Token'
			})
			return
		}
		// Success
		var commentData = req.body

		commentData['profile'] = decode.id
		controllers.comment
		.post(commentData)
		.then(function(result){
			res.json({
				confirmation: 'Success',
				comment:result
			})
		})
		.catch(function(err){

		})
	})
	
})

module.exports = router