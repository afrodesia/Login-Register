var express = require('express')
var router = express.Router()
var Profile = require('../models/Profile')

router.get('/:resource', function(req, res, next){
	var resource = req.params.resource
	if(resource == 'profile'){
		Profile.find(null, function(err, profiles){

			if(err){
				res.json({
					confirmation: 'Failed',
					message: err
				})
				retur
			}
			res.json({
				confirmation : ('success'),
				results : profiles
			})
		})
		return	
	}
	res.json({
		confirmation:'fail',
		message: 'Resource '+resource+' not suported..'
	})
})

module.exports = router