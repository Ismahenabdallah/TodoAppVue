
var express = require('express');
var path = require('path');

var logger = require('morgan');

const session = require("express-session");

const mongoose = require('mongoose')
var clc = require("cli-color");
var bodyParser = require('body-parser')

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;
//cors
app.use(cors());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS,HEAD,DELETE,PATCH");
  // res.header("Access-Control-Allow-Headers", "author");
  next();
})
app.use(logger("dev"));
app.use(express.json({ limit: "50mb", extended: false }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb", extended: false }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

mongoose.set('strictQuery', true);

mongoose.connect(process.env.URL,
  {

    useNewUrlParser: true,
    useUnifiedTopology: true,


  })
  .then(() => console.log(clc.bgBlue.underline(`Server running on PORT ${PORT} ...`)))
  .catch(err => console.log(err))
app.use('/', indexRouter);
app.use('/user', usersRouter);



module.exports = app;
