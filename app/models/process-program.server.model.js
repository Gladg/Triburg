'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Process program Schema
 */
var ProcessProgramSchema = new Schema({
	processName: {
		type: String,
		default: '',
		required: 'Please fill process name',
		trim: true
	},
	orderNo: {
		type: Number,
		required: 'Please fill order number',
		trim: false
	},
	styleNo: {
		type: Number,
		required: 'Please fill style number',
		trim: false
	},
	workOrderNo: {
		type: Number,
		required: 'Please fill work order number',
		trim: false
	},
	workOrderDate: {
		type: Date,
		default: '01/01/2000',
		required: 'Please fill work order date',
		trim: false
	},
	party: {
		type: String,
		default: '',
		required: 'Please fill party name',
		trim: true
	},
	requiredDate: {
		type: Date,
		default: '01/01/2000',
		required: 'Please fill required date',
		trim: false
	},
	remarks: {
		type: String,
		default: '',
		trim: true
	},
	slNo: {
		type: Number,
		required: 'Please fill serial number',
		trim: false
	},
	refNo: {
		type: Number,
		required: 'Please fill reference number',
		trim: false
	},
	color: {
		type: String,
		default: 'white',
		required: 'Please fill color of product',
		trim: false
	},
	specification: {
		type: String,
		default: '',
		required: 'Please fill product specifications',
		trim: true
	},
	quantity: {
		type: Number,
		required: 'Please fill quantity',
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

mongoose.model('ProcessProgram', ProcessProgramSchema);