var createError = require('http-errors');
const proxy = require('http-proxy-middleware');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors  = require('cors');
var sequelize = require('./models').sequelize;
const flash = require('connect-flash');

const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./passport');

require('dotenv').config();

const app = express();
const PORT = 3000;
sequelize.sync();
passportConfig(passport);

var joinRouter = require('./routes/join');
var loginRouter = require('./routes/login');
var scoreRouter = require('./routes/score');
var challengesRouter = require('./routes/challenges');
var logoutRouter = require('./routes/logout');
var adminRouter = require('./routes/admin');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: process.env.COOKIE_SECRET,
	cookie: {
		httpOnly: true,
		secure: false,
	},
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/join', joinRouter);
app.use('/api/login', loginRouter);
app.use('/api/score', scoreRouter);
app.use('/api/challenges', challengesRouter);
app.use('/api/logout', logoutRouter);


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`);
});