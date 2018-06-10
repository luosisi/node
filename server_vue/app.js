var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs=require('ejs')

var index = require('./routes/index');
var users = require('./routes/users');



var app = express();

// app.use(express.static(path.join(__dirname, './')))
// app.get('',function(req,res){
// 	res.sendFile(__dirname+'/dist/index.html');
// })

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.engine('.html',ejs.__express)
//如果用jade模板,必须包含一个error.jade
//app.set('view engine', 'jade');
//app.set('view engine', 'html');
app.use(express.static(path.resolve(__dirname, '../dist')))
app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    res.send(html)
})
//app.set('views', path.join(__dirname, ''));
//app.set('view engine', 'ejs');
//app.set('view engine', 'html');
//app.engine('.html',ejs.__express)
// app.listen(8080, () => {
//   console.log(`App listening at port 8080`)
// })




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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
