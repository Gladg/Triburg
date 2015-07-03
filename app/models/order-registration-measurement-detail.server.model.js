'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Order registration measurement detail Schema
 */
var OrderRegistrationMeasurementDetailSchema = new Schema({
	sLNo: {
		type: Number,
		default: '',
		required: 'Please fill serial number',
		trim: false
	},
	size: {
		type: Number,
		default: '',
		required: 'Please fill Order registration measurement size',
		trim: false
	},
	measurementpart: {
		type: String,
		default: '',
		required: 'Please fill Order registration measurement part detail',
		trim: true
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
		required: 'Please fill nnumber of units',
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

mongoose.model('OrderRegistrationMeasurementDetail', OrderRegistrationMeasurementDetailSchema);