'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Finishing activity register Schema
 */
var FinishingActivityRegisterSchema = new Schema({
	personCompanyName: {
		type: String,
		default: '',
		required: 'Please fill Finishing activity register name',
		trim: true
	},
	registerDate: {
		type: Date,
		default: '',
		required: 'Please fill register date',
		trim: false
	},
	operationName: {
		type: String,
		default: '',
		required: 'Please fill operation name',
		trim: true
	},
	preparedBy: {
		type: String,
		default: '',
		required: 'Please fill name of person who prepared activity',
		trim: true
	},
	sLNo: {
		type: Number,
		default: '',
		required: 'Please fill serial number',
		trim: false
	},
	refNo: {
		type: Number,
		default: '',
		required: 'Please fill reference number',
		trim: false
	},
	uoM: {
		type: String,
		default: '',
		required: 'Please fill units of measurement',
		trim: false
	},
	units: {
		type: Number,
		default: '',
		required: 'Please fill number of units',
		trim: false
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('FinishingActivityRegister', FinishingActivityRegisterSchema);
