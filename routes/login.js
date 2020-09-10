var createError = require('http-errors');
const express = require('express');
const models = require('../models');
var dbConObj = require('../config/db_info');
var bodyParser = require('body-parser')
var dbconnect = dbConObj.init();

const router = express.Router();

router.post('/', function(req, res, next){
    const id = req.body.id;
    const pw = req.body.password;

    models.User.findAndCountAll({
        where: {
            id: id
        }
    })
    .then( res1 => {
        console.log(res1.count);
        if (res1.count > 0){
            models.User.findAndCountAll({
                where: {
                    password: pw
                }
            })
            .then( res2 => {
                if (res2.count > 0){
                    res.status(200).json({message: "login success"});
                }
                else {
                    res.status(401).json({message: "비밀번호가 일치하지 않습니다."});
                    console.log("비밀번호가 일치하지 않습니다.");
                }
            })
            .catch(err2 => {
                console.log(err2);
            })
        }
        else {
            res.status(401).json({message: "존재하지 않는 아이디입니다."});
            console.log("존재하지 않는 아이디입니다.");
        }
    })
})
module.exports = router;