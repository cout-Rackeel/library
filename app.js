// Declaring Port
const port = process.env.PORT || 8080;

// BASE VARIABLES
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var expresslayout = require('express-ejs-layouts');
var flash = require('express-flash');
var session = require('express-session');
var validator = require('express-validator');
var path = require('path');
var mysql = require('mysql');

var app = express();

// Declaring Routes
var indexRoute = require('./routes/index');
var requestsRoute = require('./routes/requests');
var booksRoute = require('./routes/books');
var loginRoute = require('./routes/login');


// Setting up Views
app.set('views', path.join(__dirname,'views'));
app.set('view engine' , 'ejs');

// Setting up Layouts
app.set('layout' , 'layouts/layout');
app.use(expresslayout);

//Setting up Public
app.use(express.static(path.join(__dirname , 'public')))

//Setting up Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Setting up Session and Flash
app.use(cookieParser());
app.use(session({
  secret:'M1O2mb103jum&1o/',
  resave: false,
  saveUninitialized: true,
  cookie : {maxAge : 1200000}
}))
app.use(flash());

// Setting up Routing middleware
  app.use('/',  indexRoute);
  app.use('/login' , loginRoute);
  app.use('/books' ,booksRoute);
  app.use('/requests' , requestsRoute)
 

// Listening to Port

app.listen(port , () => console.log(`Listening on port ${port}...`))

module.exports = app;