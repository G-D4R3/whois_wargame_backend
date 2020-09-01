var createError = require('http-errors');
const express = require('express');
var dbConObj = require('../config/db_info');
var bodyParser = require('body-parser')
var dbconnect = dbConObj.init();

const router = express.Router();

router.post('/', function (req, res, next) {
    const id = req.body.id;
    const pw = req.body.password;

    var id_query =  "SELECT * FROM user WHERE id LIKE '"+id+"'";
    var pw_query =  "SELECT * FROM user WHERE pw LIKE '"+pw+"'";

    dbConObj.query(dbconnect, id_query, (err, resp, fields)=> {
        if(err){
            console.log(err);
        }
        if(resp.length==0){
            res.status(401).json({message: "아이디 또는 비밀번호가 일치하지 않습니다."});
            console.log("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
        dbConObj.query(dbconnect, pw_query, (err, resp, fields)=> {
            if(err){
                console.log(err);
            }
            if(resp.length==0){
                res.status(401).json({message: "아이디 또는 비밀번호가 일치하지 않습니다."});
                console.log("아이디 또는 비밀번호가 일치하지 않습니다.");
            }
            res.status(200).json({message: "login success"});
        });
    });
});
module.exports = router;