var express = require('express')
var router = express.Router()
var Profile = require('../models/Profile')
var controllers = require('../controllers')

router.post('/:resource', function(req, res, next){
	var resource = req.params.resource

	if(resource === 'profile'){

		var formData = req.body
		// PROMISE WAY

		controllers.profile
		.post(formData)
		.then(function(result){
			res.json({
				confirmation: 'Success',
				result: result
			})
		})
		.catch(function(err){
			res.json({
				confirmation: 'Fail',
				message: err
			})
		})

		//  DIRTY CALLBACK WAY

		// Profile.create(formData, function(err, profile){
		// 	if(err){
		// 		res.json({
		// 			confirmation: 'fail',
		// 			message: err
		// 		})
		// 		return
		// 	}
		// 	res.json({
		// 		confirmation: 'success',
		// 		result: profile
		// 	})
		// })
		return
	}
	res.json({
		confirmation: 'fail',
		message: 'Resource '+resource+' not supported..'
	})
})
router.get('/:resource', function(req, res, next){
	var resource = req.params.resource
	if(resource === 'profile'){
		// PROMISE WAY
		controllers.profile.get(null)
		.then(function(results){
			res.json({
				confirmation: 'Sucess',
				results: results
			})
		})
		.catch(function(err){
			res.json({
				confirmation: 'Failed',
				message: err
			})
		})
		//  DIRTY CALLBACK WAY

		// Profile.find(null, function(err, profiles){

		// 	if(err){
		// 		res.json({
		// 			confirmation: 'Failed',
		// 			message: err
		// 		})
		// 		retur
		// 	}
		// 	res.json({
		// 		confirmation : ('success'),
		// 		results : profiles
		// 	})
		// })
		return	
	}
	res.json({
		confirmation:'fail',
		message: 'Resource '+resource+' not suported..'
	})
})


router.get('/:resource/:id', function(req, res, next ){
	var resource = req.params.resource
	var id = req.params.id

	if (resource === 'profile'){

		// PROMISE WAY 
		controllers.profile
		.getById(id)
		.then(function(result){
			res.json({
				confirmation: 'Success',
				result: result
			})
		})
		.catch(function(err){
			res.json({
				confirmation: 'Fail',
				message: err.message
			})
		})

		//  DIRTY CALLBACK WAY

		// Profile.findById(id, function(err, profile){
		// 	if(err){
		// 		res.json({
		// 			confirmation:'Fail',
		// 			message: 'Profile not found'
		// 		})
		// 		return
		// 	}
		// 	if(profile === null){
		// 		res.json({
		// 			confirmation: 'Fail',
		// 			message: 'Profile not found'
		// 		})
		// 	}
		// 	res.json({
		// 		confirmation:'success',
		// 		result: profile
		// 	})
		// })
		return
	}
	res.json({
		confirmation: 'Fail',
		message: 'Resource '+resource+' not supported'

	})
})
module.exports = router