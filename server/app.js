var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session'); //必须先有cookieParse
var ejs=require('ejs')

var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');

var app = express();


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/local',{useMongoClient: true})
mongoose.connection.on('connected',function(){
	console.log("connected app ok")
})
mongoose.connection.on('error',function(){
	console.log("is error")
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.engine('.html',ejs.__express)
//app.set('view engine', 'html');


//如果用jade模板,必须包含一个error.jade
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'hubwiz app', //secret的值建议使用随机字符串
    cookie: {maxAge: 60 * 1000 * 30} // 过期时间（毫秒）
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/goods', goods);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
