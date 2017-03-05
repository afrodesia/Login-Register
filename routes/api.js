var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next){
	res.json({
		confirmation : ('sucess'),
		message : 'hi from api route!'
	})
})
module.exports = router