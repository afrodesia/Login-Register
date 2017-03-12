var Profile = require('../models/Profile')

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
	}
}