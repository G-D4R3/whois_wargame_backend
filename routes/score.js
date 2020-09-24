const models = require('../models');
var createError = require('http-errors');
const express = require('express');


const router = express.Router();

router.get('/', function(req, res, next){
    models.User.findAll({
        attributes: ['name', 'score']
    })
        .then(res1 => {
            res1.sort(function(a, b){
                return a.score > b.score ? -1 : a.score > b.score ? 1 : 0;
            })
            res.json(res1);
        })
        .catch(err => {
            console.log(err);
        })
});
module.exports = router;