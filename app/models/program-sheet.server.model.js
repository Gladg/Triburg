'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Program sheet Schema
 */
var ProgramSheetSchema = new Schema({
	orderNo: {
		type: Number,
		default: '',
		required: 'Please fill Program sheet order number',
		trim: false
	},
	styleNo: {
		type: Number,
		default: '',
		required: 'Please fill Program sheet style number',
		trim: false
	},
	workOrderNo: {
		type: Number,
		default: '',
		required: 'Please fill Program sheet work order number',
		trim: false
	},
	workOrderDate: {
		type: Number,
		default: '',
		required: 'Please fill Program sheet work order number',
		trim: false
	},
	operatorName: {
		type: String,
		default: '',
		required: 'Please fill Program sheet operator name',
		trim: true
	},
	sLNo: {
		type: Number,
		default: '',
		required: 'Please fill Program sheet serial number',
		trim: false
	},
	operationName: {
		type: String,
		default: '',
		required: 'Please fill Program sheet operation name',
		trim: true
	},
	color: {
		type: String,
		default: '',
		required: 'Please fill Program sheet item color',
		trim: false
	},
	size: {
		type: Number,
		default: '',
		required: 'Please fill Program sheet item size',
		trim: false
	},
	quantity: {
		type: Number,
		default: '',
		required: 'Please fill Program sheet item quantity',
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

mongoose.model('ProgramSheet', ProgramSheetSchema);