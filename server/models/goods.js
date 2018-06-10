var mongoose=require("mongoose")
var Schema=mongoose.Schema

var prodcuctSchema=new Schema({
  "pid" : Number,
  "pName" : String,
  "salePrice" : Number,
  "pImg" : String
})
prodcuctSchema.pre('save', function(next) {
  next();
})
//module.exports=mongoose.model('Good',prodcuctSchema)
module.exports=mongoose.model('Good',prodcuctSchema)