const models = require('../models');
var createError = require('http-errors');
const express = require('express');
const { isLoggedIn} = require('./middlewares');


const router = express.Router();
/*
router.get('/', isLoggedIn, function(req, res, next){
    models.Problem.findAll()
        .then(res1 => {
            //사용자 문풀 체크
            res.json(res1);
            console.log(res1);
        })
        .catch(err => {
            console.log(err);
        })
});
*/

router.get('/', isLoggedIn, (req, res, next) => {
	models.Solved.findAndCountAll({
		where: {
			userID: req.user.userID
		}
	})
	.then (res1 => {
		console.log(JSON.stringify(res1.rows, ["problemID"]));
	})
	.catch(err => {
		console.log(err);
	})
})
module.exports = router;