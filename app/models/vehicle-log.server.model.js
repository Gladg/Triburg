'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Vehicle log Schema
 */
var VehicleLogSchema = new Schema({
	weekStartingDate: {
		type: Date,
		default: '',
		required: 'Please fill Vehicle log week starting date',
		trim: false
	},
	vehicleNo: {
		type: Number,
		default: '',
		required: 'Please fill Vehicle number',
		trim: false
	},
	date: {
		type: Date,
		default: '',
		required: 'Please fill Vehicle log date ',
		trim: false
	},
	startingKMReading: {
		type: Number,
		default: '',
		required: 'Please fill Vehicle starting km reading',
		trim: false
	},
	endingKMReading: {
		type: Number,
		default: '',
		required: 'Please fill Vehicle ending km reading',
		trim: false
	},
	driverName: {
		type: String,
		default: '',
		required: 'Please fill driver name',
		trim: true
	},
	date1: {
		type: Date,
		default: '',
		required: 'Please fill Vehicle log date1',
		trim: false
	},
	billNo: {
		type: Number,
		default: '',
		required: 'Please fill Vehicle log bill number',
		trim: false
	},
	ltrs: {
		type: Number,
		default: '',
		required: 'Please fill Vehicle feul comsumption in litres',
		trim: false
	},
	amount: {
		type: Number,
		default: '',
		required: 'Please fill Vehicle log amount',
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

mongoose.model('VehicleLog', VehicleLogSchema);