var mongoose=require("mongoose")
var Schema=mongoose.Schema

var prodcuctSchema=new Schema({
  "pid" : String,
  "pName" : String,
  "salePrice" : String,
  "pImg" : String
})
//module.exports=mongoose.model('Good',prodcuctSchema)
module.exports=mongoose.model('Good',prodcuctSchema,'Goods')