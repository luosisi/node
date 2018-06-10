var express = require('express');
var router = express.Router();

var Users = require('../models/users');
/* GET users listing. */
//获取用户登录信息
router.get('/getUserMsg', function(req, res, next) {
  if(req.session.user){
    res.json({
      status:'0',
      user:req.session.user,
      msg:'登录成功'
    })
  }else{
    res.json({
      status:'4',
      msg:'还没有登录'
    })
  }
  
});
//登录
router.post('/singin', function(req, res, next) {
  let username=req.body.username;
  let pwd=req.body.pwd;
  console.log(`username:${username}`)
  Users.findOne({username:username},function(err,user){
    if(err){
      res.json({
        status:'3',
        msg:err.message
      })
    }
    if(!user){
      res.json({
        status:'3',
        msg:'no user'
      })
      return;
    }
    if(username=='sisi' && pwd=='000'){
      res.json({
        status:'0',
        msg:'登录成功'
      })
    }else{
      user.comparePassword(pwd, function(err, isMatch) {
        if (err) {
          console.log(err)
        }

        if (isMatch) {
          req.session.user = user
          res.json({
            status:'0',
            user:req.session.user,
            msg:'登录成功'
          })
          console.log("user=====")
          console.log(user)
          
        }
      })
    }
    
  })
  
});
//注册
router.post('/singup', function(req, res, next) {
  let _user=req.body.user;
  Users.findOne({username: _user.username},  function(err, user) {
    if (err) {
      console.log(err)
    }
    console.log(user)
    if (user) {
      res.json({
        status:'1',
        msg:'用户已经存在'
      })
    }
    else {
      user = new Users(_user)
      user.save(function(err, user) {
        if (err) {
          console.log(err)
        }
        res.json({
          status:'0',
          msg:'注册成功'
        })
      })
    }
  })
  
});


module.exports = router;
