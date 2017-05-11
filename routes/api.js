const express = require('express')
const router = express.Router()

const controllers = require('../controllers')

router.post('/:resource', function(req, res, next){
	const resource = req.params.resource
	const controller = controllers[resource]

	if(controller === null){
		res.json({
			confirmation: 'Failed',
			message: 'Resource '+resource+' not supported..'
		})
		return
	}
	const formData = req.body

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
	const resource = req.params.resource
	const controller = controllers[resource]

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
	const resource = req.params.resource
	const controller = controllers[resource]

	if (controller === null){
		res.json({
			confirmation:'Failed',
			message: 'Resource '+resource+' not suported..'
		})
		return
	}
	const id = req.params.id
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