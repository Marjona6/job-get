"use strict";

var express = require('express');
var app = express();

//var bodyParser = require('body-parser');
//mongoose.connect(DATABASE_URL, {
//    useMongoClient: true
//});
//
//mongoose.Promise = global.Promise;


app.use(express.static('public'));
app.listen(process.env.PORT || 8080);


// Q: How to integrate jQuery/client.js? Right now I am getting an error: "ReferenceError: $ is not defined"
// Q: How do I make a test? "Add one test that verifies that when you hit up the root url for your client, you get a 200 status code and HTML."
// Q: When I access the app via /public/index.html in a browser, console shows the error "Uncaught ReferenceError: require is not defined at server.js:3". What is the problem here? Is it because I'm accessing it from the html page rather than from localhost?
