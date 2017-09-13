"use strict";

var chai = require('chai');
var chaiHttp = require('chai-http');

var mongoose = require('mongoose');

// requiring in the js files from this app
var _require = require('../server'),
    app = _require.app,
    runServer = _require.runServer,
    closeServer = _require.closeServer;

var _require2 = require('../config'),
    TEST_DATABASE_URL = _require2.TEST_DATABASE_URL;

// chai
var should = chai.should();
chai.use(chaiHttp);

describe('GET endpoint to root URL', function () {
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    after(function () {
        return closeServer();
    });

    it('should retrieve job lead items on GET', function() {
        return chai.request(app)
            .get('/leads')
            .then(function(res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                // It is quite possible for the app to work properly with zero items in the /leads endpoint,
                // ... so we will NOT check for a minimum res.body.length.
            });
    });
});

describe('POST endpoint to `/leads`', function() {
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    after(function () {
        return closeServer();
    });
    // TEST STRATEGY:
    // 1. Make a POST request with data for a new job lead item
    // 2. Inspect response object and check for correct status code and that '_id' exists
    it('should add a job lead item on POST to endpoint `/leads`', function() {
        var newLead = {
            position: 'The One',
            company: 'The Matrix',
            funnelStage: 5,
            companyOverview: 'There is no spoon',
            companySize: '1',
            positionLocation: 'Inside the Matrix',
            salaryBenefits: 'One red pill',
            jobDescription: 'Save humanity',
            applicationDate: '1999-03-31',
            contactName: 'Trinity',
            contactEmail: 'trinity@thematrix.org',
            applicationMaterials: 'Spoon-bending test',
            interviewDate: '1999-09-03',
            interviewFollowUp: 'Learn Kung Fu',
            leadSource: 'Morpheus',
            notes: 'Seems like I might have to dodge a lot of bullets',
            rating: 4,
            username: 'neo@theone.org'
        };
        return chai.request(app)
            .post('/leads')
            .send(newLead)
            .then(function(res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.include.keys(
                    '_id',
                    'position',
                    'company',
                    'funnelStage',
                    'companyOverview',
                    'companySize',
                    'positionLocation',
                    'salaryBenefits',
                    'jobDescription',
                    'applicationDate',
                    'contactName',
                    'contactEmail',
                    'applicationMaterials',
                    'interviewDate',
                    'interviewFollowUp',
                    'leadSource',
                    'notes',
                    'rating',
                    'username');
                res.body._id.should.not.be.null;
                res.body.should.deep.equal(Object.assign(newLead, {_id: res.body._id}));
            });
    });
});

    



