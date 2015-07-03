'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Cutting register Schema
 */
var CuttingRegisterSchema = new Schema({
	orderNo: {
		type: Number,
		required: 'Please fill Cutting register order no.',
		trim: false
	},
	
	styleNo: {
		type: Number,
		required: 'Please fill Cutting register style no.',
		trim: false
	},
	
	registerDate: {
		type: Date,
		required: 'Please fill Cutting register date',
		trim: false
	},
	
	bundleNo: {
		type: Number,
		required: 'Please fill Cutting register bundle number',
		trim: false
	},
	
	lotNo: {
		type: Number,
		required: 'Please fill Cutting register lot number',
		trim: false
	},
	
	color: {
		type: String,
		default: '',
		required: 'Please fill color',
		trim: false
	},
	
	size: {
		type: Number,
		default: '',
		trim: false
	},
	pcs: {
		type: Number,
		required: 'Please fill number of pieces',
		trim: true
	},
	cM: {
		type: Number,
		default: '',
		required: 'Please fill length in centimeters',
		trim: true
	},
	preparedBy: {
		type: String,
		default: '',
		required: 'Please fill by whom the form was prepared by',
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

mongoose.model('CuttingRegister', CuttingRegisterSchema);

