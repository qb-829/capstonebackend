
// require libraries
const express = require("express");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

// store instance in a variable for later
const app = express();

const port = process.env.PORT;

//body-parser
//scrape email and password form request header using html form
app.use(express.urlencoded({extended: true}));
//scrape email and password form request header using Postman api
app.use(express.json());

//setup public folder
app.use(express.static('./public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/node"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET, // used to sign the cookie
    resave: false, // update session even w/ no changes
    saveUninitialized: true, //always create a session
    cookie: {
        secure: false, // true: oly accept https req's
        maxAge: 1000 * 60 * 60 * 24, // time in seconds
    }
  })
);

app.use(require('./routes/authentication'));
app.use(require('./routes/playlist'));
app.use(require('./routes/review'));


app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});
