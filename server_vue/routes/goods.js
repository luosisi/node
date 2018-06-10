var express = require('express');
var router = express.Router();

//连接数据库
const models = require('../bin/db');
var Goods = require('../models/goods');
/* GET users listing. */
router.get('/api/getGoods', function(req, res, next) {
  let page=req.param('page')
  let pageSize=req.param('pageSize')
  let sort=req.param('sort')
  console.log(page)
  let queryParams={}
  let pageNum=(page-1)*pageSize
  let goodModel=Goods.find(queryParams).skip(pageNum).limit(pageSize)
  goodModel.sort({'salePrice':sort})
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
  			result:{
  				count:doc.length,
  				list:doc
  			}
  		})
  	}
  })  
});

module.exports = router;
