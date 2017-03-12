var Profile = require('../models/Profile')
var Promise =  require('bluebird')

module.exports = {
	get: function(params){
		return new Promise(function(resolve, reject){
			// 
			Profile.find(params, function(err, profiles){
				if(err){
					reject(err)
					return
				}
				resolve(profiles)
			})
		})
	},
	getById: function(id){
		return new Promise(function(resolve, reject){
			Profile.findById(id, function(err, profile){
				if(err){
					reject(err)
					return
				}
				if(profile === null){
					reject(new Error('Profile No Found'))
					return
				}
				resolve(profile)
			})
		})
	},
	post: function(body){
		return new Promise(function(resolve, reject){
			Profile.create(body, function(err, profile){
				if(err){
					reject(err)
					return
				}
				resolve(profile)
			})
		})
	}
}