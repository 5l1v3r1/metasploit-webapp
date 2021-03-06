var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var msfapi = require('./lib/msfrpc-connection.js');

var index = require('./routes/index');
var users = require('./routes/users');
var workspaces = require('./routes/workspaces')
var hosts = require('./routes/hosts')
var modules = require('./routes/modules')
var sessions = require('./routes/sessions')
var jobs = require('./routes/jobs')

var app = express();

// view engine setup
app.set('views', [__dirname + '/views',
				__dirname + '/view/workspaces',
        __dirname + '/view/hosts',
        __dirname + '/view/modules',
        __dirname + '/view/sessions',
        __dirname + '/view/jobs' ]);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/workspaces', workspaces);
app.use('/hosts', hosts);
app.use('/modules', modules);
app.use('/sessions', sessions);
app.use('/jobs', jobs);

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

msfapi.initMsfConsole()
  .then( (res) => {
    console.log(res);
  }).catch( (err) => {
    console.log(err);
  })

msfapi.keepTokenConsoleAlive()
	.then( (res) => {
		console.log(res);
	}).catch( (err) => {
		console.log(err);
	})

module.exports = app;
