const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sessions = require('client-sessions');
require('dotenv').config()

const dbUrl = 'mongodb://localhost/profile-signup'
mongoose.connect(dbUrl, function(err, res){
  if(err){
    console.log('DB CONNECTION FAILED')
  }
   else{
      console.log('DB CONNECTION SUCCESS')
    }
})


const routes = require('./routes/index');
const account = require('./routes/account');
const api = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessions({
  cookieName:'session',
  duration:24*60*60*1000,
  secret: process.env.SESSION_SECRET,
  activeDuration: 24*60*1000
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/forms', routes);
app.use('/account', account);
// app.use('/profile', routes);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
