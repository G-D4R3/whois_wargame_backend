const models = require('../models');
const express = require('express');
const {isLoggedIn, noPermission} = require('./middlewares');

const router = express.Router();


router.post('/add', checkPermission, (req, res, next) => {
    const body =  req.body;

    models.Problem.create({
        name: body.name,
        score: body.score,
        flag: body.flag,
        link: body.link,
        description: body.description
    })
        .then(result => {
            console.log("문제 추가 완료");
            res.redirect("/");
        })
        .catch(err=> {
            console.log("문제 추가 실패");
        })
});

router.get('/edit/:id',checkPermission, (req, res, next) => {
    const id = req.params.id;

    models.Problem.findOne({
        where: {
            id: id
        }
    })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log("문제 조회에 실패하였습니다.");
        })
    }); // 수정하기 위해 아이디로 수정할 문제 정보 받아오는 기능

router.put('/:id', checkPermission, (req, res, next) => {
    const problemID = req.params.id;
    const body = req.body;

    models.Problem.update({
        name: body.name,
        score: body.score,
        flag: body.flag,
        link: body.link,
        description: body.description
    },{
        where: {
            id: problemID
        }
    })
        .then(result => {
            console.log("문제 수정 완료");
            res.redirect("/");
        })
});//수정해서 업데이트 하는 기능

router.delete('/:id', checkPermission, (req, res, next)=> {
    const id = req.body.id;

    models.Problem.destroy({
        where: {
            id: id
        }
    })
        .then(result => {
            res.redirect("/");
        })
        .catch(err => {
            console.log("문제 삭제 실패");
        });
});

function checkPermission(req, res, next){
    const id = req.body.id;
    if (id != 'admin') return noPermission(req,res);
    next();
}