"use strict";

var chai = require('chai');
var chaiHttp = require('chai-http');

var mongoose = require('mongoose');

var should = chai.should();

// requiring in the js files from this app
var _require = require('../server'),
    app = _require.app,
    runServer = _require.runServer,
    closeServer = _require.closeServer;

var _require2 = require('../config'),
    TEST_DATABASE_URL = _require2.TEST_DATABASE_URL;

chai.use(chaiHttp);

describe('GET endpoint to root URL', function () {
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    after(function () {
        return closeServer();
    })
})
