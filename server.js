"use strict";

var User = require('./models/user');
var Lead = require('./models/lead');
var bodyParser = require('body-parser');
var config = require('./config');
var mongoose = require('mongoose');
var express = require('express');
var app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.Promise = global.Promise;

var runServer = function (callback) {
    mongoose.connect(config.DATABASE_URL, function (err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function () {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function (err) {
        if (err) {
            console.error(err);
        }
    });
};


// step 4 (continuing from client.js): local API endpoint in server.js
app.post('/login', function(req, res) {
	console.log(req);
	//console.log(req.body.password);
	// send data from login to database
	// for now, send it without validation
	// step 5: send the local data to the database
	User.create({
		username: req.body.username,
		password: req.body.password
	}, function (err, user) {
		// step 6: return the result of DB call
		if(err) {
			return res.status(500).json({
				message: 'Internal Server Error'
			});
		}
		// step 7: send the result back to client.js
		console.log(user);
		res.status(201).json(user);

	});
});

// step b4 (continuing from client.js): local API endpoint in server.js
app.post('/create-new', function(req, res) {
	console.log(req);
	// step b5: send the local data to the database
	Lead.create({
		position: req.body.position,
		company: req.body.company,
        companyOverview: req.body.companyOverview,
        companySize: req.body.companySize,
        positionLocation: req.body.positionLocation,
        salaryBenefits: req.body.salaryBenefits,
        jobDescription: req.body.jobDescription,
        applicationDate: req.body.applicationDate,
        contactName: req.body.contactName,
        contactEmail: req.body.contactEmail,
        applicationMaterials: req.body.applicationMaterials,
        interviewDate: req.body.interviewDate,
        interviewFollowUp: req.body.interviewFollowUp,
        leadSource: req.body.leadSource,
        notes: req.body.notes,
        rating: req.body.rating
	}, function (err, lead) {
		// step b6: return the result of DB call
		if(err) {
			return res.status(500).json({
				message: 'Internal Server Error'
			});
		}
		// step b7: send the result back to client.js
		console.log(lead);
		res.status(201).json(lead);

	});
});

exports.app = app;
exports.runServer = runServer;

// app.listen is always the last line in server.js
// app.listen(process.env.PORT || 8080);