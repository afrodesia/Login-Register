var express = require('express')
var router = express.Router()

var controllers = require('../controllers')

router.post('/:resource', function(req, res, next){
	var resource = req.params.resource
	var controller = controllers[resource]

	if(controller === null){
		res.json({
			confirmation: 'Failed',
			message: 'Resource '+resource+' not supported..'
		})
		return
	}
	var formData = req.body

	controller
	.post(formData)
	.then(function(result){
		res.json({
			confirmation: 'Success',
			result: result
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'Failed',
			message: err
		})
	})
})

router.get('/:resource', function(req, res, next){
	var resource = req.params.resource
	var controller = controllers[resource]

	if (controller === null){
		res.json({
			confirmation:'Failed',
			message: 'Resource '+resource+' not suported..'
		})
		return
	}
	controller
	.get(req.query)
	.then(function(results){
		res.json({
			confirmation: 'Success',
			results: results
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'Failed',
			message: err
		})
	})	
})


router.get('/:resource/:id', function(req, res, next ){
	var resource = req.params.resource
	var controller = controllers[resource]

	if (controller === null){
		res.json({
			confirmation:'Failed',
			message: 'Resource '+resource+' not suported..'
		})
		return
	}
	var id = req.params.id
	controller
	.getById(id)
	.then(function(result){
		res.json({
			confirmation: 'Success',
			result: result
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'Failed',
			message: err.message
		})
	})
})

module.exports = router