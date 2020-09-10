var createError = require('http-errors');
const proxy = require('http-proxy-middleware');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors  = require('cors');
var sequelize = require('./models').sequelize;

const app = express();
const PORT = 3000;
sequelize.sync();

var joinRouter = require('./routes/join');
var loginRouter = require('./routes/login');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api/join', joinRouter);
app.use('/api/login', loginRouter);

app.post('/api/hello', (req,res) => {
    res.send({
        username: req.body.name
    });
});
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`);
});