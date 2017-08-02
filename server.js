"use strict";

var User = require('./models/user');
var Lead = require('./models/lead');
var bodyParser = require('body-parser');
var config = require('./config');
var mongoose = require('mongoose');
var cors = require('cors');
var bcrypt = require('bcrypt');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var express = require('express');
var app = express();
app.use(bodyParser.json());
app.use(cors());
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

// logging
// app.use('*', function(req, res) {
//     return res.status(404).json({message: 'Not found'});
// });

// ----------- LEAD ENDPOINTS ------------------------
// GET: getting all the lead objects to populate the dashboard
app.get('/leads', function (req, res) {
    Lead
        .find()
        .then(function (leads) {
            res.json({
                leads: leads.map(function (lead) {
                    return lead;
                })
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// GET: getting one lead object
app.get('/leads/:id', function (req, res) {
    Lead
        .findById(req.params.id).exec().then(function (lead) {
            return res.json(lead);
        })
        .catch(function (leads) {
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// POST: signing in a user
// next step is verifying and validating the user credentials
app.post('/login', function (req, res) {
    var user = req.body.username;
    var pwd = req.body.password;
    console.log(user);
    console.log(pwd);
    User
        .findOne({
            username: req.body.username
        }, function(err, items) {
            if (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
            if (!items) {
                // bad username
                return res.status(401).json({
                    message: "Not found!"
                });
            } else {
                items.validatePassword(req.body.password, function(err, isValid) {
                    if (err) {
                        console.log('there was an error validating the password');
                    }
                    if (!isValid) {
                        return res.status(401).json({
                            message: "Not found"
                        });
                    } else {
                        console.log("User logged in: " + req.body.username);
                        return res.json(items);
                    }
                    // return sth here?
                });
            };
        });
        // .then(function (user) {
        //     //res.json({
        //         // console.log(res.body); // returns undefined
        //         // leads: users.map(function (user) {
        //         //    // return user;
        //         // })
        //    // });
        // })
        // .catch(function (err) {
        //     console.error(err);
        //     res.status(500).json({
        //         message: 'Internal server error'
        //     });
        // });
});

// POST: creating a new user
// step 4 (continuing from client.js): local API endpoint in server.js
app.post('/users/create', function (req, res) {
    var username = req.body.username;
    username = username.trim();
    var password = req.body.password;
    password = password.trim();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }
        
        User.create({
            username: username,
            password: hash,
        }, function(err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            if(item) {
                console.log("User: " + username + " created.");
                return res.json(item);
            }
        });
        });
    });
});

// POST: creating a new lead
// step b4 (continuing from client.js): local API endpoint in server.js
app.post('/leads', function (req, res) {
    //console.log(req);
    // step b5: send the local data to the database
    Lead.create({
        position: req.body.position,
        company: req.body.company,
        funnelStage: req.body.funnelStage,
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
        rating: req.body.rating,
        username: req.body.username // this should not be here
    }, function (err, lead) {
        // step b6: return the result of DB call
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        // step b7: send the result back to client.js
        //console.log(lead);
        console.log(lead);
        res.status(201).json(lead);

    });
});

// PUT: updating a lead
app.put('/leads/:id', function(req, res) {
    // console.log('updating a lead by id');
    // console.log(req);
    // console.log(req.body.id + ' is req.body.id just so you know');
    // console.log(req.params.id + ' is req.params.id FYI');
    // ensure that the id in the request path and the one in request body match
    // if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    //     var message = 'Request path id (' + req.params.id + ') and request body id ' + ('(' + req.body.id + ') must match');
    //     console.error(message);
    //     res.status(400).json({
    //         message: message
    //     });
   // }
    var toUpdate = {};
    var updateableFields = ['position', 'company', 'funnelStage', 'companyOverview', 'companySize', 'positionLocation', 'salaryBenefits', 'jobDescription', 'applicationDate', 'contactName', 'contactEmail', 'applicationMaterials', 'interviewDate', 'interviewFollowUp', 'leadSource', 'notes', 'rating'];
    updateableFields.forEach(function(field) {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    Lead.findByIdAndUpdate(req.params.id, {
        $set: toUpdate
    }).exec().then(function(lead) {
        return res.status(204).end();
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

// DELETE: deleting a lead
app.delete('/leads/:id', function(req, res) {
    //console.log('deleting a lead by id');
    //console.log(req);
    Lead.findByIdAndRemove(req.params.id).exec().then(function(lead) {
        return res.status(204).end();
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', function (req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;

// app.listen is always the last line in server.js
// app.listen(process.env.PORT || 8080);
