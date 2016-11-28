"use strict";

const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser   = require('body-parser');
const flash        = require('connect-flash');
const ENV          = process.env.ENV || "development";


// require database
const knexConfig = require("./knexfile");
const knex       = require("knex")(knexConfig[ENV]);
const knexLogger = require('knex-logger');
const morgan     = require('morgan');

//require routes
const index           = require('./routes/index');
const usersRoutes     = require('./routes/users');
const imagesRoutes = require('./routes/images');
const registerRoutes  = require('./routes/register');
const loginRoutes     = require('./routes/login');
const logoutRoutes    = require('./routes/logout');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(morgan('dev'))
app.use(knexLogger(knex));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: 'face_replace_cookie',
  secret: 's$Uup3RSecre+M$22G'
}));
app.use(flash())


app.use('/', index(knex));
app.use('/users', usersRoutes(knex));
app.use('/images', imagesRoutes(knex));
app.use('/register', registerRoutes(knex));
app.use('/login', loginRoutes(knex));
app.use('/logout', logoutRoutes(knex));


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
