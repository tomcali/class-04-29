// Using Express, MySQL, Handlebars, and the starter code which was
// slacked out to you as a jumping-off point, you will be creating
// a simple web application which allows users to create, read, update,
//     and delete popular quotes.
//
//     Your application will have two pages:
//
//     One will show all of the quotes within a database and will
// allow users to create a new quote or delete an existing one.
//     A button next to each, labeled “Update This Quote,” will
// take users to the other page which shows the quote selected
// and will allow them to update it with new information.
//     Make sure to run the code contained within the schema.sql
// and seeds.sql files beforehand so that you have a database with which to work.

// began with setting up the mysql database starting the server
// mysql.server start

// then went into the cli for mysql
// mysql -u root -p

// the set up schema
// source schema.sql

// then seeded the database with initial quotations
// source seeds.sql

// to see available databases
// show databases;

// to work with the correct database
// use quotes_db;

// to see the tables
// show tables;  // note that quotes is table

// to see the contents of the database
// select * from quotes;


var express = require("express");
var bodyParser = require("body-parser");

// clients can only submit get and post requests
// but with methodOverride the surver can convert
// selected gets or posts to puts and deleteds
// that is what method-override does for us
var methodOverride = require("method-override");
var path = require('path');
var mysql = require('mysql');

var app = express();
var port = 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

// server uses database credentials to attach to the database server
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quotes_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// //  set up static middleware
// // Serve static content for the app
// // from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));
var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
//
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//
// // Set Handlebars as the default templating engine.
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");
//
// // Data
// var lunches = [
//     {
//         lunch: "Beet & Goat Cheese Salad with minestrone soup."
//     }, {
//         lunch: "Pizza, two double veggie burgers, fries with a big glup"
//     }
// ];
//
// // Routes  render comes from express
// // when we pass in an object like lunches[0] express opens up that object
// app.get("/weekday", function(req, res) {
//     res.render("index", lunches[0]); // look for index.handlebars inside views directory
// });

// custom 404 page
app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// custom 500 page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

//
// // this when req is made to the root
// // need to display index.handlebars
app.get('/', function(req, res) {
    console.log('Rendering the home page from express');
    res.render('index');
});
//     res.sendFile('home.html', {root: path.join(__dirname, 'app/public')});
// //    res.end('welcome to express on the client');
// });
//
// // this when req is made to the root
// app.get('/survey', function(req, res) {
//     console.log('Rendering the survey');
//     res.sendFile('survey.html', {root: path.join(__dirname, 'app/public')});
// });











// Express and MySQL code should go here.

app.listen(port, function() {
  console.log("Listening on PORT " + port);
});
