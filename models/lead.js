"use strict";

var mongoose = require('mongoose');

var leadSchema = new mongoose.Schema({
	leadId: Schema.Types.ObjectId,
	position: {
		type: String,
		required: false
	},
	company: {
		type: String,
		required: false
	},
	companyOverview: {type: String},
	companySize: {type: String,
		required: false},
	positionLocation: {type: String,
		required: false},
	salaryBenefits: {type: String,
		required: false},
	jobDescription: {type: String,
		required: false},
	applicationDate: {type: Date,
		required: false},
	contactName: {type: String,
		required: false},
	contactEmail: {type: String,
		required: false},
	applicationMaterials: {type: String,
		required: false},
	interviewDate: {type: Date,
		required: false},
	interviewFollowUp: {type: String,
		required: false},
	leadSource: {type: String,
		required: false},
	notes: {type: String,
		required: false},
	desirability: {type: Number,
		required: false}
});

var lead = mongoose.model('lead', leadSchema);

module.exports = lead;