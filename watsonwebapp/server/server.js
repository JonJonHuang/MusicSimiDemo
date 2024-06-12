var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes');
var usersRouter = require('./routes/users');
var conversationRouter = require('./routes/conversation');
var matchRouter = require('./routes/match');
var personalityRouter = require('./routes/personality');
var authRouter = require('./routes/auth');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var sess = require('./session');

var app = express();

app.use(cors());
app.use(sess);

app.use('*', (req, res, next) => {
  console.log(req.sessionID);
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/conversation', conversationRouter);
app.use('/personality', personalityRouter);
app.use('/check-auth', authRouter);
app.use('/register', registerRouter);
app.use('/match', matchRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);


app.use(function (req, res, next) {
  res.status(404).send("Error 404 not found");
});

module.exports = app;
