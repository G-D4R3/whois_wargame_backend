const models = require('../models');
var createError = require('http-errors');
const express = require('express');


const router = express.Router();

router.get('/', function(req, res, next){
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
module.exports = router;