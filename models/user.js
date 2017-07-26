"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: false},
	password: {
		type: String,
		required: false}
});

var User = mongoose.model('User', userSchema);

module.exports = User;