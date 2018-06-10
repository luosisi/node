var express = require('express');
var router = express.Router();

var Goods = require('../models/goods');

/* GET users listing. */

//req.body.id  需要载入body-parser中间件才可以使用req.body,此方法通常用来解析POST请求中的数据

//req.query.id  多适用于GET请求，解析GET里的参数,包含URL的查询参数（在URL的？后的参数）如:/search?id=123

//req.params.id 包含路由参数（在URL的路径部分）如:/search:id

//req.param('id') 此方法被弃用，不建议使用。优先级是先拿路由部分，在拿body参数，最后拿query参数

router.get('/', function(req, res, next) {
  let sort=parseInt(req.query.sort);
  let page=parseInt(req.query.page);
  let pageSize=parseInt(req.query.pageSize);
  let skip=(page-1)*pageSize;
  let saleLever=parseInt(req.query.saleLever);
  let priceGt=0,pricelte=0;
  let searchText=req.query.searchText;
  let params={};
  if(saleLever!==0){
    switch(saleLever){
      case 1:priceGt=0;pricelte=100;break;
      case 2:priceGt=100;pricelte=200;break;
    }
    params={
      salePrice:{$gt:priceGt,$lte:pricelte}
    }
  }
  
  console.log(params)
  let goodModel=Goods.find(params).skip(skip).limit(pageSize);
  goodModel.sort({'salePrice':sort})
  // Goods.find({},function(err,doc){})  
  goodModel.exec(function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        list:doc
      })
    }
  })  
});
//保存新增
router.post('/save', function(req, res, next) {
  let _good=req.body.good;
  //cons
  let good = new Goods(_good)
  good.save(function(err, good) {
    if (err) {
      console.log(err)
    }
    res.json({
      status:'0',
      msg:'新增成功'
    })
  })
});



//保存新增
router.post('/del', function(req, res, next) {
  var _pid = req.body.pid
  var _pName = req.body.pName

  if (_pid) {
    console.log(_pid)
    // Goods.find(function(err,good){
    //   console.log(good)
    // })
    Goods.find({pid:_pid},function(err,good){
      console.log(good)
    })
    Goods.remove({pName:_pName}, function(err, good) {
      if (err) {
        res.json({
          status:'3',
          msg:'删除失败'
        })
      }else {
        res.json({
          status:'0',
          msg:'删除成功'
        })
      }
    })
  }
});

module.exports = router;
