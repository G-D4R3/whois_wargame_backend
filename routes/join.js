var createError = require('http-errors');
const express = require('express');
const models = require('../models');
var bodyParser = require('body-parser')
const validator = require('validator');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', function(req, res, next){
    const name = req.body.name;
    const id = req.body.id;
    const pw = req.body.password;
    const email = req.body.email;
    console.log(req.body);

    models.User.findAndCountAll({
        where: {
            email: email
        }
    })
    .then (res1 => {
        if (res1.count === 0) {
            models.User.findAndCountAll({
                where: {
                    id: id
                }
            })
            .then (res2 => {
                if (res2.count === 0){
                    models.User.findAndCountAll({
                        where: {
                            name: name
                        }
                    })
                    .then (res3 => {
                        if(res3.count === 0){
                            if (validator.isEmail(email)){
                                if (validator.isAlphanumeric(id)){
                                    const hash = bcrypt.hashSync(pw, 12);
                                        models.User.create({
                                        email: email,
                                        id: id,
                                        name: name,
                                        password: hash,
                                        })
                                        .then( res4 => {
                                            res.status(201).json({
                                            email: email,
                                            id: id,
                                            name: name
                                            });
                                        })
                                        .catch(err4 => {
                                            console.log(err4);
                                        })
                                    }
                                else return res.status(400).json({message: "유효하지 않은 아이디입니다"});
                            }   
                            else return res.status(400).json({message: "유효하지 않은 이메일 주소입니다"});
                        }
                        else{
                            res.status(409).json({message: "닉네임 중복"});
                            console.log("이미 존재하는 닉네임입니다.");
                        }
                    })
                    .catch(err3=> {
                        console.log(err3);
                    })
                }
                else {
                    res.status(409).json({message: "아이디 중복"});
                    console.log("이미 존재하는 아이디입니다.");
                }
            })
            .catch (err2 => {
                console.log(err2);
            })
        }
        else {
            res.status(409).json({message: "이메일 중복"});
            console.log("이미 존재하는 이메일 주소입니다.");
        }
    })
    .catch (err1 => {
        console.log(err1);
    })

})

module.exports = router;
