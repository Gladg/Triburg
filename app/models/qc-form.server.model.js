'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Qc form Schema
 */
var QcFormSchema = new Schema({
	orderNo: {
		type: Number,
		default: '',
		required: 'Please fill Qc form order number',
		trim: false
	},
	qCName: {
		type: String,
		default: '',
		required: 'Please fill Qc form name',
		trim: true
	},
	inspectionDate: {
		type: Date,
		default: '',
		required: 'Please fill Qc form inspection date',
		trim: false
	},
	
	reportName: {
		type: String,
		default: '',
		required: 'Please fill report name',
		trim: true
	},
	sLNo: {
		type: Number,
		default: '',
		required: 'Please fill Qc form serial number',
		trim: true
	},
	refNo: {
		type: Number,
		default: '',
		required: 'Please fill reference number',
		trim: true
	},
	partMeasured: {
		type: String,
		default: '',
		required: 'Please fill part measured',
		trim: true
	},
	uoM: {
		type: String,
		default: '',
		required: 'Please fill units of measurement',
		trim: false
	},
	refUnits: {
		type: Number,
		default: '',
		required: 'Please fill Qc form reference units',
		trim: false
	},
	observedUnits: {
		type: Number,
		default: '',
		required: 'Please fill Qc form observed units ',
		trim: true
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

mongoose.model('QcForm', QcFormSchema);