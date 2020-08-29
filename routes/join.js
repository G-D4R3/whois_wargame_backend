var createError = require('http-errors');
const express = require('express');
var dbConObj = require('../config/db_info');
var bodyParser = require('body-parser')
var dbconnect = dbConObj.init();

const router = express.Router();

//http://blog.tjsrms.me/%EC%A0%95%EA%B7%9C%ED%91%9C%ED%98%84%EC%8B%9D%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%9C%A0%ED%9A%A8%EC%84%B1-%EA%B2%80%EC%82%AC-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC/
function email_check( email ) {

    var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return (email != '' && email != 'undefined' && regex.test(email));

}

function id_check( id ){
    var regex = /^[a-zA-Z0-9]{4,20}$/;
    return (id != '' && id != 'undefined' && regex.test(id));
}

function pw_check( pw ){
    var regex = /^[a-zA-Z0-9]{8,20}$/;
    return (pw != '' && pw != 'undefined' && regex.test(pw));
}

function pw_check( name ){
    var regex = /^[a-zA-Z0-9]{2,20}$/;
    return (name != '' && name != 'undefined' && regex.test(name));
}

router.post('/', function (req, res, next) {
    const name = req.body.username;
    const id = req.body.id;
    const pw = req.body.password;
    const email = req.body.email;
    console.log(req.body);
    //dbConObj.dbopen(dbconnect);

    var result = new Object();
    var email_query =  "SELECT * FROM user WHERE email LIKE '"+email+"'";
    var id_query =  "SELECT * FROM user WHERE id LIKE '"+id+"'";
    var name_query =  "SELECT * FROM user WHERE name LIKE '"+name+"'";
    var asign = "INSERT INTO user (id, pw, email) VALUE ('"+id+"', '"+pw+"', '"+email+"')";

    dbConObj.query(dbconnect, email_query, (err, resp, fields)=>{
        if(err){
            console.log(err);
        }
        if(resp.length===0){
            if(email_check(email)){
                console.log("등록 가능한 이메일 주소입니다.");
                dbConObj.query(dbconnect, id_query, (err, resp, fields)=>{
                    if(err){
                        console.log(err);
                    }
                    if(resp.length===0){
                        if(id_check(id)){
                            console.log("사용가능한 아이디입니다.");
                            res.send("success");
                            //res.status(200).json({message: "사용가능한 아이디입니다."});
                            dbConObj.query(dbconnect, asign, (err, response, fields)=>{
                                if(err){
                                    console.log(err);
                                }
                            })
                        }
                        else{
                            res.status(400).json({message: "유효하지 않은 아이디입니다."});
                        }
                    }
                    else if(resp.length>0){
                        res.status(400).json({message: "이미 존재하는 아이디입니다. "});
                        console.log("이미 존재하는 아이디입니다.");
                    }
                })
            }
            else{
                res.status(400).json({message: "유효하지 않은 이메일 주소"});
            }
        }
        else if(resp.length>0){
            res.status(409).json({message: "이메일 중복"});
            console.log("이미 존재하는 이메일 주소입니다.");
        }
    })


});

module.exports = router;