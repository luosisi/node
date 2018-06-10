
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10

var userSchema = new mongoose.Schema({
  "username" : String,
  "pwd" : String,
  "uid" : String,
  "level" : Number
})

userSchema.pre('save', function(next) {
  var user = this

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.pwd, salt, function(err, hash) {
      if (err) return next(err)

      user.pwd = hash
      next()
    })
  })
})

userSchema.methods = {
  comparePassword: function(_pwd, cb) {
  	console.log(`_pwd:${_pwd}`)
  	console.log(`this.pwd:${this.pwd}`)
    bcrypt.compare(_pwd, this.pwd, function(err, isMatch) {
      if (err) return cb(err)

      cb(null, isMatch)
    })
  }
}

userSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}
module.exports=mongoose.model('User',userSchema)